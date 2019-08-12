import React, {FC, Fragment, useEffect, useMemo, useState} from 'react';
import randomColor from 'randomcolor';
import {FaPlusCircle} from 'react-icons/fa'
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router'
import {Route} from 'react-router-dom';
import {Pie} from 'react-chartjs-2';

import './PoolDetails.scss';
import AddTransactionModal from './AddTransactionModal';
import Transaction from './Transaction';
import {selectPoolDetails} from './selectors'

import {getPoolDetails} from 'actions/pools/pools';
import {getTransactionList} from 'actions/transactions/transactions';

import {selectParamsPoolId, selectParamsTransactionId} from 'selectors/props';
import DispatchProp from 'types/dispatch';
import ReduxState, {PoolModel, PoolUserModel, TransactionModel, UserModel} from 'types/state';
import {Button, Collapse, ListGroup, ListGroupItem} from "shards-react";
import {sortByDateAdded} from "utils/sort";

export interface PoolUsersDetails extends Omit<PoolUserModel, 'user'> {
  user: UserModel | null
}

interface ConnectProps {
  pool: PoolModel | undefined;
  poolId: string;
  poolUsers: PoolUsersDetails[];
  transactions: TransactionModel[];
  transactionId: string;
}

type PoolDetailsProps = ConnectProps & DispatchProp & RouteComponentProps;

export const getPoolUserDisplayName = (poolUser: PoolUsersDetails) => {
  if (!poolUser) return '';
  return poolUser.user ? poolUser.user.first_name ? `${poolUser.user.first_name} ${poolUser.user.last_name}` : poolUser.user.email : poolUser.unverified_email
};


const PoolDetails: FC<PoolDetailsProps> = ({dispatch, pool, poolId, poolUsers, transactions}) => {
  const [poolUsersToColors, setPoolUsersToColors] = useState<{[key: string]: string} | null>(null);
  const [showParticipants, setShowParticipants] = useState<boolean>(true);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState<boolean>(false);

  const sortedPoolUsers = poolUsers.sort(sortByDateAdded);
  const poolUserIds = JSON.stringify(sortedPoolUsers.map(poolUser => poolUser.id));
  const sortedTransactions = transactions.sort(sortByDateAdded);
  const transactionIds = JSON.stringify(sortedTransactions.map(transaction => transaction.id));

  useEffect(() => {
    if (poolUsersToColors === null && sortedPoolUsers.length) {
      const randomColors = randomColor({count: sortedPoolUsers.length, luminosity: 'light'})
      setPoolUsersToColors(poolUsers.reduce((colors, poolUser, index) => {
        colors[poolUser.id] = randomColors[index]
        return colors;
      }, {}))
    }
  }, [poolUserIds, transactionIds]);

  useEffect(() => {
    if (poolId) {
      dispatch(getPoolDetails(poolId));
      dispatch(getTransactionList({pool__identifier: poolId}));
    }
  }, [poolId]);

  const getSpendingForPoolUser = (poolUser: PoolUsersDetails) => {
    const userTransactions = sortedTransactions.filter(transaction => transaction.pool_user === poolUser.id);
    return userTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const generateChartData = useMemo(() => {
    if (poolUsersToColors) {
      return {
        labels: sortedPoolUsers.map(getPoolUserDisplayName),
        datasets: [
          {
            data: sortedPoolUsers.reduce((transactions, poolUser) => {
              const userTransactions = sortedTransactions.filter(transaction => transaction.pool_user === poolUser.id);
              return [...transactions, ...userTransactions.map(transaction => transaction.amount)];
            }, []),
            backgroundColor: sortedPoolUsers.reduce((colors, poolUser) => {
              const userTransactions = sortedTransactions.filter(transaction => transaction.pool_user === poolUser.id);
              const userColor = poolUsersToColors[poolUser.id];
              return [...colors, ...userTransactions.map(transaction => userColor)];
            }, []),
            label: sortedPoolUsers.reduce((labels, poolUser) => {
              const userTransactions = sortedTransactions.filter(transaction => transaction.pool_user === poolUser.id);
              return [...labels, ...userTransactions.map(transaction => `${getPoolUserDisplayName(poolUser)} - ${transaction.title}`)];
            }, [])
          },
          {
            data: sortedPoolUsers.map(getSpendingForPoolUser),
            backgroundColor: sortedPoolUsers.map(poolUser => poolUsersToColors[poolUser.id]),
            label: sortedPoolUsers.map(poolUser => {
              return `${getPoolUserDisplayName(poolUser)} - Total Amount`
            })
          }
        ]
      }
    }
  }, [poolUserIds, transactionIds]);

  const handleClickToggleShowParticipants = () => {
    setShowParticipants(!showParticipants)
  };

  const renderPoolUserPricing = (poolUser: PoolUsersDetails) => {
    console.log('hmm', costPerUser);
    const spending = getSpendingForPoolUser(poolUser)
    return <p key={poolUser.id}>
      {getPoolUserDisplayName(poolUser)}
      {spending > costPerUser ?
        <>{` is owed $`}<span className="color-secondary font-weight-bold">{spending - costPerUser}</span></> :
        spending < costPerUser ?
          <>{` owes $`}<span className="color-danger font-weight-bold">{costPerUser - spending}</span></> :
          'is Gucci'}
    </p>
  };

  const toggleAddTransactionModal = (e?) => {
    e && e.preventDefault();
    setShowAddTransactionModal(!showAddTransactionModal);
  };

  const totalTransactionCost = transactions.reduce((total, transaction) => {
    return total += transaction.amount;
  }, 0);

  const costPerUser = totalTransactionCost / poolUsers.length;

  return poolId && pool ? <div className="PoolDetails">
    <div className="details">
      <h1>{pool.name}</h1>
    <Button className="bg-color-tertiary--dark border-none" theme="success" onClick={handleClickToggleShowParticipants}>{showParticipants ? 'Hide' : 'Show'} Participants</Button>
      <Collapse open={showParticipants}>
        <div className="participants">
          {poolUsers.map(poolUser => {
            return <Button key={poolUser.id} theme="light" style={{backgroundColor: poolUsersToColors ? poolUsersToColors[poolUser.id] : ''}} outline pill>
              {getPoolUserDisplayName(poolUser)}
            </Button>
          })}
        </div>
      </Collapse>
      <div className="transactions">
        <div className="transactions-list">
          <ListGroup>
            <ListGroupItem className="add-transaction cursor-pointer" onClick={toggleAddTransactionModal}>Add a new transaction <FaPlusCircle/> </ListGroupItem>
            {transactions.map(({amount, identifier, notes, pool_user, title}) => {
              const poolUser = poolUsers.find(({id}) => id === pool_user);
              const displayTitle = `${title || 'Untitled'} - ${poolUser ? getPoolUserDisplayName(poolUser) : 'Removed User'} - $${amount}`
              return <Fragment key={identifier}>
                <Transaction notes={notes} poolId={poolId} identifier={identifier} title={displayTitle}/>
              </Fragment>
            })}
          </ListGroup>
        </div>
        <div className="graph">

          <Pie
            data={generateChartData || {data: {datasets: [], labels: []}}}
            options={{
              animation: {
                animateRotate: true
              },
              legend: {
                display: false
              },
              aspectRatio: 1,
              maintainAspectRatio: true,
              responsive: true,
              tooltips: {
                callbacks: {
                  label: function(item, data) {
                    return `${data.datasets[item.datasetIndex].label[item.index]} : $${data.datasets[item.datasetIndex].data[item.index]}`;
                  }
                }
              }
            }}
          />
        </div>
        <div className="calculations">

          <h3>Cost Breakdown</h3>
          <p>Total Transaction Costs: ${transactions.reduce((total, transaction) => {
            return total += transaction.amount;
          }, 0)}</p>
          <p>Cost Per Person: <span className="color-danger">${costPerUser}</span></p>
          <h4>Remaining Payments</h4>
          {sortedPoolUsers.map(renderPoolUserPricing)}
        </div>
        <AddTransactionModal dispatch={dispatch} pool={pool.id} poolUsers={poolUsers} open={showAddTransactionModal} toggle={toggleAddTransactionModal}/>
      </div>
    </div>
  </div> : null;
};

export default withRouter(connect((state: ReduxState, props: RouteComponentProps): ConnectProps => {
  const poolId = selectParamsPoolId(state, props);
  const transactionId = selectParamsTransactionId(state, props);
  return {
    poolId,
    transactionId,
    ...selectPoolDetails(state, props)
  }
})(PoolDetails));


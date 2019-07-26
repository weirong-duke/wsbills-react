import React, {FC, useEffect, useMemo, useState} from 'react';
import randomColor from 'randomcolor';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router'
import {Route} from 'react-router-dom';
import {Pie} from 'react-chartjs-2';

import './PoolDetails.scss';
import Transaction from './Transaction';
import {selectPoolDetails} from './selectors'

import {getPoolDetails} from 'actions/pools/pools';
import {getTransactionList} from 'actions/transactions/transactions';

import {selectParamsPoolId, selectParamsTransactionId} from 'selectors/props';
import DispatchProp from 'types/dispatch';
import ReduxState, {PoolModel, PoolUserModel, TransactionModel, UserModel} from 'types/state';
import {Button, Collapse, ListGroup} from "shards-react";
import {sortByDateAdded} from "utils/sort";

interface PoolUsersDetails extends Omit<PoolUserModel, 'user'> {
  user: UserModel | null
}

interface ParentProps {
  isPoolListOpen: boolean;
}

interface ConnectProps {
  pool: PoolModel | undefined;
  poolId: string;
  poolUsers: PoolUsersDetails[];
  transactions: TransactionModel[];
  transactionId: string;
}

const colorList = [
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#000000",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#808080",
  "#FF6384",
  "#FFCE56",
  "#5FC500",
  "#0FAFFF",
];

const data = {
  datasets: [
    /* Outer doughnut data starts*/
    {
      data: [
        10,
        20,
        30
      ],
      backgroundColor: [
        "rgb(255, 0, 0)", // red
        "rgb(0, 255, 0)", // green
        "rgb(0, 0, 255)", //blue
      ],
      label: 'Doughnut 1'
    },
    /* Outer doughnut data ends*/
    /* Inner doughnut data starts*/
    {
      data: [
        45,
        25,
        11,
        20,
        40,
        30
      ],
      backgroundColor: [
        "rgb(255, 0, 0)", // red
        "rgb(0, 255, 0)", // green
        "rgb(0, 0, 255)",
        "rgb(23, 64, 140",
        "rgb(123, 164, 140"//blue
      ],
      label: 'Doughnut 2'
    }
    /* Inner doughnut data ends*/
  ],
  labels: [
    "Info 1",
    "Info 2",
    "Info 3"
  ]
};

type PoolDetailsProps = ConnectProps & DispatchProp & ParentProps & RouteComponentProps;

const PoolDetails: FC<PoolDetailsProps> = ({dispatch, isPoolListOpen, pool, poolId, poolUsers, transactions}) => {
  const [showParticipants, setShowParticipants] = useState<boolean>(true);
  const [detailsOpened, setDetailsOpened] = useState<boolean>(false);
  const [poolUsersToColors, setPoolUsersToColors] = useState<{[key: string]: string} | null>(null);

  const sortedPoolUsers = poolUsers.sort(sortByDateAdded);
  const poolUserIds = JSON.stringify(sortedPoolUsers.map(poolUser => poolUser.id));
  const sortedTransactions = transactions.sort(sortByDateAdded);
  const transactionIds = JSON.stringify(sortedTransactions.map(transaction => transaction.id));

  useEffect(() => {
    if (poolUsersToColors === null && sortedPoolUsers.length) {
      setPoolUsersToColors(poolUsers.reduce((colors, poolUser) => {
        colors[poolUser.id] = randomColor({luminosity: 'bright'})
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

  useEffect(() => {
    if (!isPoolListOpen) {
      setTimeout(() => {
        setDetailsOpened(isPoolListOpen);
      }, 400);
    }
    else {
      setDetailsOpened(true)
    }
  }, [isPoolListOpen]);

  const getPoolUserDisplayName = poolUser => {
    return poolUser.user ? poolUser.user.first_name ? `${poolUser.user.first_name} ${poolUser.user.last_name}` : poolUser.user.email : poolUser.unverified_email
  };

  const generateChartData = useMemo(() => {
    console.log('this is actually running')
    if (poolUsersToColors) {
      console.log('poolUsersToColors', poolUsersToColors, sortedPoolUsers)
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
            data: sortedPoolUsers.map(poolUser => {
              const userTransactions = sortedTransactions.filter(transaction => transaction.pool_user === poolUser.id);
              return userTransactions.reduce((total, transaction) => total + transaction.amount, 0);
            }),
            backgroundColor: sortedPoolUsers.map(poolUser => poolUsersToColors[poolUser.id]),
            label: sortedPoolUsers.map(poolUser => {
              return `${getPoolUserDisplayName(poolUser)} - Total Amount`
            })
          }
        ]
      }
    }
  }, [poolUserIds, transactionIds]);

  console.log('uuhhh.', generateChartData, poolUsersToColors)

  const handleClickToggleShowParticipants = () => {
    setShowParticipants(!showParticipants)
  };



  return poolId && pool ? <div className={`PoolDetails ${detailsOpened ? 'open' : ''}`}>
    <div className="details">
      <h1>{pool.name}</h1>
    <Button className="bg-color-tertiary--dark border-none" theme="success" onClick={handleClickToggleShowParticipants}>{showParticipants ? 'Hide' : 'Show'} Participants</Button>
      <Collapse open={showParticipants}>
        <div className="participants">
          {poolUsers.map(poolUser => {
            return <Button key={poolUser.id} theme="light" outline pill>
              {getPoolUserDisplayName(poolUser)}
            </Button>
          })}
        </div>
      </Collapse>
      <div className="transaction-details">
        <div className="transactions">
          <ListGroup>
            {transactions.map(({identifier, pool_user, title}) => {
              const poolUser = poolUsers.find(({id}) => id === pool_user);
              const displayTitle = `${title || 'Untitled'} - ${poolUser ? getPoolUserDisplayName(poolUser) : 'Removed User'}`
              return <Transaction poolId={poolId} key={identifier} identifier={identifier} title={displayTitle}/>
            })}
          </ListGroup>
        </div>
        <div className="graph">

          <Pie
            data={generateChartData || []}
            width={1000}
            height={500}
            options={{
              animation: {
                animateRotate: true
              },
              legend: {
                onClick: () => {}
              },
              maintainAspectRatio: true,
              responsive: true,
              tooltips: {
                callbacks: {
                  label: function(item, data) {
                    console.log(data.labels, item);
                    return `${data.datasets[item.datasetIndex].label[item.index]} : $${data.datasets[item.datasetIndex].data[item.index]}`;
                  }
                }
              }
            }}
          />
        </div>
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


import React, {FC} from 'react';
import {ListGroupItem} from "shards-react";
import {Link} from 'react-router-dom';

interface TransactionProps {
  identifier: string;
  poolId: string;
  title: string;
}

const Transaction: FC<TransactionProps> = ({identifier, poolId, title}) => {
  return <Link to={`/pools/${poolId}/transactions/${identifier}`}><ListGroupItem>{title}</ListGroupItem></Link>
};

export default Transaction;
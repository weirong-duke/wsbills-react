import React, {FC, useCallback, useState} from 'react';
import {Collapse, ListGroupItem} from "shards-react";
import {Link} from 'react-router-dom';


interface TransactionProps {
  notes: string | null;
  identifier: string;
  poolId: string;
  title: string;
}

const Transaction: FC<TransactionProps> = ({notes, identifier, poolId, title}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleNote = () => {
    setIsOpen(!isOpen)
  };

  const renderNote = useCallback(() => {
    return <div className="transaction-note">
      <span className="transaction-note-styled-line"/>
      <div className="transaction-note-text">{notes || 'No additional notes'}</div>
    </div>
  }, [notes]);

  return <Link onClick={handleToggleNote} to={`/pools/${poolId}/transactions/${identifier}`}>
    <ListGroupItem>{title}</ListGroupItem>
    <Collapse open={isOpen}>
      {renderNote()}
    </Collapse>
  </Link>
};

export default Transaction;
import React, {FC} from 'react';
import {Button, ButtonGroup, Form as ShardsForm, FormInput, FormGroup, FormSelect, FormTextarea, Modal, ModalBody, ModalHeader} from "shards-react";
import { Form, Field } from 'react-final-form'

import {createTransaction} from 'actions/transactions/transactions';

import {getPoolUserDisplayName, PoolUsersDetails} from 'routes/PoolDetails';

import './AddTransactionModal.scss';
import DispatchProp from "types/dispatch";


interface AddTransactionModalProps {
  open: boolean;
  pool: number;
  poolUsers: PoolUsersDetails[];
  toggle: (e: MouseEvent) => void;
}

type ComponentProps = AddTransactionModalProps & DispatchProp

const AddTransactionModal: FC<ComponentProps> = ({dispatch, open, pool, poolUsers, toggle}) => {
  const handleFormSubmit = async values => {
    const {amount, notes, pool, poolUser, title} = values;
    dispatch(createTransaction({
      amount: amount || '',
      notes,
      pool,
      pool_user_id: poolUser,
      title
    }));
  }

  const renderForm = () => {
    return <Form
      initialValues={poolUsers[0] ? {
        pool,
        poolUser: poolUsers[0].id
      } : {}}
      onSubmit={handleFormSubmit}
      render={({handleSubmit, form, submitting, pristine, values}) => {
        return <ShardsForm onSubmit={handleSubmit}>
          <FormGroup>
            <Field name="poolUser">
              {({input, meta}) => {
                return <div>
                  <label>Participant</label>
                  <FormSelect {...input}>
                    {poolUsers.map(poolUser => {
                      return <option key={poolUser.id} value={poolUser.id}>{getPoolUserDisplayName(poolUser)}</option>
                    })}
                  </FormSelect>
                </div>
              }}
            </Field>
          </FormGroup>
          <FormGroup>
              <Field name="title">
                {({input, meta}) => {
                  return <div>
                    <label>Title</label>
                    <FormInput required aria-required="true" {...input}  />
                  </div>
                }}
              </Field>
            </FormGroup>
          <FormGroup>
            <Field name="amount">
              {({input, meta}) => {
                return <div>
                  <label>Amount</label>
                  <FormInput {...input}  type="number"/>
                </div>
              }}
            </Field>
          </FormGroup>
          <FormGroup>
            <Field name="notes">
              {({input, meta}) => {
                return <div>
                  <label>Notes</label>
                  <FormTextarea {...input}/>
                </div>
              }}
            </Field>
          </FormGroup>
          <ButtonGroup>
            <Button className="bg-color-tertiary--dark border-none" >Add</Button>
            <Button onClick={toggle} theme="danger">Cancel</Button>
          </ButtonGroup>
          </ShardsForm>

      }}
    >

    </Form>
  };

  return <Modal className="AddTransactionModal" open={open} toggle={toggle}>
    <ModalHeader>Add Transaction</ModalHeader>
    <ModalBody>{renderForm()}</ModalBody>
  </Modal>
};

export default AddTransactionModal;
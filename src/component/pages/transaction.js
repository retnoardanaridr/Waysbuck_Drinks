import React, { useContext, useEffect, useState } from 'react';
import { Container, Table,  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../contexts/userContext';
import Navibar from './navbar';

function Transaction() {
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);
    const [state, dispacth] = useContext(UserContext)

    const getTransaction = async () => {
        try {
            const response = await API.get(`/transactions`);
            setTransaction(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getTransaction()
    }, [])

    return (
        <>
            <Navibar />
            <Container className="tableContainer">
                <h1>Income Transaction</h1>
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Post Code</th>
                                <th>Income</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction?.map((item, index) => (
                                <tr
                                    // onClick={() => handleShow(item?.id)}
                                    key={index}
                                    className={item.status === "" ? "dnone" : ""}
                                >
                                    <td>{index + 1}</td>
                                    <td>{item?.user.name}</td>
                                    <td>{item?.user.profile?.address}</td>
                                    <td>{item?.user.profile?.postal_code}</td>
                                    <td className="tablePrice">Rp. 2000000</td>
                                    <td
                                        className={
                                            item?.status === "Success"
                                                ? "tableSuccess"
                                                : item?.status === "Cancel"
                                                    ? "tableCancel"
                                                    : item?.status === "pending"
                                                        ? "tableWaiting"
                                                        : "tableOtw"
                                        }
                                    >
                                        {item?.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {/* <ModalTransaction
                    showTrans={showTrans}
                    close={handleClose}
                    id={idOrder}
                /> */}
            </Container>

        </>
    )
}

export default Transaction;
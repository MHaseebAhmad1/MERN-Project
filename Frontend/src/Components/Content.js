import React, { useContext } from 'react';
import { Global } from '../App';

function Content() {
    const { myApi, data1, name, id, email, phone, myFunc, myChange, handleDelete, handleEdit } = useContext(Global);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Enter User Data</h2>
                        <form onSubmit={e => {
                            e.preventDefault();
                            myFunc(data1);
                            e.target.reset();
                        }}>
                            <div className="form-group">
                                <label>Id</label>
                                <input ref={id} type="text" name='id' className='form-control' onInput={myChange} />
                                <label>Name</label>
                                <input ref={name} type="text" name='name' className='form-control' onInput={myChange} />
                                <label>Email</label>
                                <input ref={email} type="text" name='email' className='form-control' onInput={myChange} />
                                <label>Phone</label>
                                <input ref={phone} type="text" name='phone' className='form-control' onInput={myChange} />
                            </div>
                            <input type="submit" className='btn btn-success' />
                        </form>
                    </div>
                    <div className="col-md-8">
                        <h2>Show User Data</h2>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myApi.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td><button className='btn btn-primary' onClick={() => { handleDelete(i, item._id) }}>Del</button><button className='btn btn-success' onClick={() => { handleEdit(i, item._id) }}>Edit</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
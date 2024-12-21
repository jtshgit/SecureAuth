import React from 'react';

const Detail = ({ data }) => {

    return (
        <div>
            <div className="tab-pane fade show active" id="account" role="tabpanel">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Public info</h5>
                    </div>
                    <div className="card-body">
                        <center>
                            <div className="">
                                <div className="small-12 medium-2 large-2 columns">
                                    <div className="circle">

                                        {data ? (
                                            <img alt='profile-photo' className="profile" src={process.env.REACT_APP_API_URL + `/proxy-image?url=${encodeURIComponent(data.user.pp)}`} />
                                        ) : (<div className='skeleton'></div>)}
                                    </div>
                                </div>
                            </div>
                        </center>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <div style={{ height: '30px' }}>{data ? (<h4>{data.user.name}</h4>) : (<div className='skeleton'></div>)}</div>
                            <div style={{ height: '20px', marginTop: '5px' }}>{data ? (<p>{data.user.email}</p>) : (<div className='skeleton'></div>)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail;

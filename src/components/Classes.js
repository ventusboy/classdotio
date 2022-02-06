import axios from "axios";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";

function Classes(props) {
    const [userClasses, setUserClasses] = useState([])

    useEffect(async () => {
        axios.post('/getUserInfo').then((userInfo) => {
            console.log(userInfo)
        })
    })
    return render(
        <div>
            <div className="col-7">
                <div className="card" style={{ height: '100%' }}>
                    <div className="d-flex card-header container align-items-center">
                        <h1 className="col-4 ">Classes</h1>
                        <Search changeSearch={this.changeSearch} searchtext={this.state.searchtext} />
                    </div>
                    <div className="card-body container-fluid" style={{ overflow: "scroll", overflowX: "hidden" }}>
                        <div className="row">
                            <Truecard list={this.state.list} searchtext={this.state.searchtext} delete={this.onDelete} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Classes
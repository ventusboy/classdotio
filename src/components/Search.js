import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            searchtext: ''
        }
        this.search = this.search.bind(this);
        //this.process=this.process.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    search(event) {
        this.props.changeSearch(event.target.value);
    }

    onKeyDown(e) {
        if (e.keyCode === 8 || e.key === 'Backspace') {
            console.log('deleted');
        }
    }

    render() {
        const bar = (
            <input
                className="col-7 form-control"
                placeholder="Search"
                name="search"
                id="search"
                onChange={this.search}
                value={this.props.searchtext}
                onKeyDown={this.onKeyDown}
            ></input>
        );
        return bar;
    }
}

function changeSearch(value) {
    this.setState({ searchtext: value });
    var items;

    if (value !== '') {

        this.setState({
            list: this.state.oglist.filter((item) => {

                if (Object.values(item).toString().toLowerCase().includes(value.toLowerCase())) {
                    console.log(Object.values(item));
                    return item;
                }

            })
        });
    }
    else {
        this.setState({ list: this.state.oglist });
    }
}

export default Search
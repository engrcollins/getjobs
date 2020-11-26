import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

const PriceRow = (props) => {
    return(
        <tr><td>{props.category}</td></tr>
    )
}
const Slider = (props) =>{
  const [data, setData] = useState([10,20,30,40,50]);
  const [inputValue, setInputValue] = useState('');
    const handleClick = (e) => {
        var newData = data.filter((v)=>{
            if(v<inputValue) {
                return v;
            }
        });
        console.log(newData);
        setData(newData);
    }
    const handleChange = (e) => {
        setInputValue( e.target.value );
    }
        var rows=[];
        data.forEach((d)=>{
            rows.push(<PriceRow key={d} category={d}/>);
        });
        return (
            <div className="slider" article-form="true">
                <input
                type="text"
                className="input-field"
                id="email"
                required
                placeholder="Price from..."
                defaultValue={inputValue}
                onChange={handleChange}
                name="price_filter"
            />

                <Button onClick={handleClick}>Price Filter</Button>
            <table>
                <tbody>
            {rows}
                    </tbody>
                </table>
            </div>
        );
}

export default Slider;

/* CLASS COMPONENT VERSION
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import './index.css';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
class PriceRow extends React.Component {
    render() {
        return <tr><td>{this.props.category}</td></tr>;
    }
}
class Slider extends Component {
    constructor(props){
        super(props);
        this.state={"data":[10,20,30,40,50],inputValue:''};

    }
    handleClick() {
        var data=this.state.data.filter((v)=>{
            if(v>this.state.inputValue) {
                return v;
            }
        });
        console.log(data);
        this.setState({data:data});
    }
    handleChange(e) {
        this.setState({ inputValue: e.target.value });
    }
    render() {

        var rows=[];
        this.state.data.forEach((d)=>{
            rows.push(<PriceRow key={d} category={d}/>);
        });
        return (
            <div className="slider">
                <FormControl
                    type="text"
                    placeholder="Enter Calculate"
                    defaultValue={this.state.inputValue}
                    onChange={this.handleChange.bind(this)}
                />

                <Button onClick={this.handleClick.bind(this)} bsStyle="primary">Calculate</Button>
            <table>
                <tbody>
            {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
ReactDOM.render(
    <Slider />,
    document.getElementById('root')
);*/
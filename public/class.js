//import trashIcon from './assets/delete.svg';


var classes = Array();

var completedArray = [];
var incomplete = [];
var eligible = [];


function createclass(name, area, code, completed, prereqs) {
    var classvar = {
        name: name,
        code: code,
        area: area,
        completed: completed,
        pre: prereqs,
        color: 'red',
        rank: code,
    };

    if (completed) {
        completedArray.push(area + ' ' + code);
    }

    return classvar;
}

function load() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/payload', true);

    //console.log('loading');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //console.log('response is ' + xhr.responseText);
            classes = JSON.parse(xhr.responseText);
            //console.log(classes);

            classes.forEach((item) => {
                item.pre = JSON.parse(item.pre);
                if (item.completed) {
                    completedArray.push(item.area + ' ' + item.code);
                }
            });
            //console.log(completedArray);

            update();
        }
    }
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
    //console.log(classes);
    return;
}


/*
var name0 = createclass('intro to basket weaving', 'BSK', '1000', true, []);
classes.push(name0);
classes.push(createclass('basic basket weaving', 'BSK', '1001', true, ['BSK 1000']));
classes.push(createclass('basic basket weaving 2', 'BSK', '1002', true, ['BSK 1001']));
classes.push(createclass('basket weaving Marketing 101', 'BIZ', '2101', false, ['BSK 1001']));
classes.push(createclass('Mass Production basket weaving', 'BIZ', '2001', false, ['BSK 1001']));

classes.push(createclass('Detailed and Quality basket weaving', 'BSK', '2000', false, ['BIZ 2101', 'BSK 1002']));
*/



$(document).ready(function () {
    load();
    // update(); 

});
//classes = JSON.parse(localStorage.getItem('classstorage'));


// $('#classform button').click(function (e) {
function sendData() {
    // e.preventDefault();
    let prereqs = [];

    //console.log(classes);
    let name = $('#name').val().trim();
    //console.log(name);
    let preclasscode = $('#classcode').val().trim(' ').replace(/\s/g,'');
    let classcode = preclasscode.substring(3, preclasscode.length);
    let area = preclasscode.substring(0, 3).toUpperCase();
    let completed = $('#completed').prop('checked');
    prereqs = $('#prereqs').val().toUpperCase().trim().split(',');

    prereqs=prereqs.map((str)=>{
        str=str.replace(/\s/g,'');

        if(str.length%7!=0||str.length==0){
           return null;
        }

        //console.log('str is'+str);
        return str.slice(0,3)+' '+str.slice(3,str.length);
    });


    prereqs=prereqs.filter((e)=>{
        return e
    });

    console.log(prereqs);

    ////console.log(classes);
    classes.push(createclass(name, area, classcode, completed, prereqs));
    //ReactDOM.render(<Classcard classes={classes} />, document.getElementById('root'));
    $('#name').val('');
    $('#classcode').val('');
    $('#completed').checked = false;
    $('#prereqs').val('');
    //update();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit', true);

    //console.log('yeet');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //console.log('response is ' + xhr.responseText);
        }
    }
    //console.log(classes[classes.length - 1]);
    xhr.setRequestHeader("Content-type", "application/json");


    xhr.send(JSON.stringify(classes[classes.length - 1]));

    update();
}


//});





const initstate = {
    name: '',
    classcode: '',
    prereqs: '',
    nameError: '',
    classcodeError: '',
    prereqError: '',
    value: '',
    //valid: false
    valid: true
}

class Iform extends React.Component {
    constructor(props) {
        super(props);
        this.state = initstate;
        this.handleChange = this.handleChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);

    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    codeChange(event) {
        this.setState({
            classcode: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            //console.log('valid!');
            sendData();
            // this.state=initstate;
            ////console.log(this.state);
            this.setState({ name: '' });
            this.setState({ classcode: '' });
            this.setState({ prereqs: '' });

            //setInterval(update,1000);
        }
    }

    validate() {
        this.setState({ nameError: '' });
        this.setState({ classcodeError: '' });
        let fast = 1;

        //console.log('no way 2');
        if (!this.state.name) {
            this.setState({ nameError: "name cannot be empty" });
            ////console.log('no way!');
            this.setState({ valid: false });
            fast = 0;

            // return false;
        }
        if (!this.state.classcode) {
            this.setState({ classcodeError: "class code cannot be empty" });
            this.setState({ valid: false });
            fast = 0;

            //return false;
        }

        ////console.log('the final state is ' + this.state.valid);

        if (fast === 1) {
            //this.setState({ valid: true });   
            return true;
        }
        else {
            //this.setState({valid: true});
            return false;
        }

    }

    render() {
        return (
            <form id="classform" className="" onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <br></br>
                    <input type="text" id="name" className={this.state.nameError ? 'form-control incorrect' : 'form-control'} value={this.state.name} onChange={this.handleChange}></input>
                    <div className="errorMsg">{this.state.valid ? '' : this.state.nameError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="classcode">code</label>
                    <br></br>
                    <input type="text" id="classcode" className={this.state.classcodeError ? 'incorrect' : 'form-control'} value={this.state.classcode} onChange={this.codeChange}></input>
                    <div className="errorMsg">{this.state.valid ? '' : this.state.classcodeError}</div>
                </div>


                <div className="form-group">
                    <label htmlFor="classcode">completed:</label>
                    <input type="checkbox" name="complete" id="completed" className="" style={{ marginLeft: '20px' }}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="prereqs">prereq(s):</label>
                    <br></br>
                    <input type="text" id="prereqs" className="form-control"></input>
                </div>

                <br></br>
                <button type="submit" className="btn btn-primary" form="classform">submit</button>
                

            </form>

            
        );
    }
}
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: ''
        }
        this.search=this.search.bind(this)
    }

    search(event){
        this.setState({
            value: event.target.value
        });

        let searchClasses=classes.map((item)=>{
            //console.log(item);
            if(JSON.stringify(item).includes(this.state.value)){
                console.log(item);
                return item;
            }
        });
        update();
    }


    render(){
        const bar=(
            <input className="col-7 form-control" placeholder="Search" name="search" id="search" onChange={this.search} value={this.state.value}></input>
        );
    return bar;
    }
}


function Classcard(props) {
    const array = props.classes;
    //console.log(array);



    const items = array.map((item) =>



        <div id={item.area + '-' + item.code} className={preReqsMet(item) + ' classCard col-10 container offset-1'}>
            <div className="row">
            <h3 className="col-4">{item.area + ' ' + item.code}</h3>
            <h3 className="col-7">{item.name}</h3>
            <img className="col-1" class="deletebtn" src="./assets/delete.svg"/>
            </div>
            <div className="row">
            <h4 className="col-8">pre-reqs: <PreReqList pre={item.pre} /> </h4>
            <h4 className="col-4">completed: {item.completed ? 'yes' : 'no'}</h4>
            </div>
            <div className="row">
            <p className="col-12">description: the course you need to learn all about {item.name}</p>
            </div>
        </div>
    );



    return (
        <div className="row">
            <div className="col-3">
                <div className="card ">
                    <div className="card-header">
                        <h1>Class Input</h1>
                    </div>
                    <div className="card-body">
                        <Iform />
                    </div>
                </div>
            </div>
            <div className="col-7">
                <div className="card" style={{ height:'90vh'}}>
                    <div className="d-flex card-header container align-items-center">
                        
                            <h1 className="col-4 ">Classes</h1>
                            <Search/>
                        
                    </div>
                    <div className="card-body container-fluid" style={{overflow:"scroll", overflowX:"hidden"}}>
                        <div className="row">
                            {items}
                        </div>
                    </div>
                </div>
            </div>



        
        </div>
    );

}

function PreReqList(props) {
    //let preReqListParse=JSON.parse(props.pre)
    

    let preReqListParse = props.pre;
    //console.log(preReqListParse);
    




    const prereqs = preReqListParse.map((item) =>

        <button type="button" onClick={navigateTo} className="btn btn-secondary" style={ {marginRight: "3px"}} value={item.replace(' ','-')} >{item} </button>
    );
    return prereqs;
}
function navigateTo(obj){
    let button=obj.target;

    let elmnt=document.getElementById(button.value);
    //console.log("#"+button.value);
    elmnt.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}





function update(classList) {

    //let classes=JSON.parse(classes);



    classList = classList.sort((a, b) => {


        return a.completed - b.completed;
    });


    //console.log(classes);
    ReactDOM.hydrate(<Classcard classes={classList} />, document.getElementById('root'));

}

function preReqsMet(info) {
    let pre = info.pre;
    //console.log(completedArray);
    //console.log(pre);
    if (info.completed) {
        info.color = 'blue';
        info.rank = '1';
        //console.log('blue');
        return 'blue';
    }
    else {

        for (var i = 0; i < pre.length; i++) {
            if (!completedArray.includes(pre[i])) {
                info.color = 'red';
                info.rank = '3';
                //console.log('red');
                return 'red';
            }
        }
        //info.rank='2';
        info.color = 'yellow';
        info.rank = '2'
        //console.log('yellow');
        return 'yellow';
    }


}





//can(classes);

function can(classs) {
    classes.pre.forEach(element => {
        if (!completedArray.includes(element)) {
            //console.log('class is not there');
            return false;
        }
        else
            return true;
        //console.log(element.code);
    });
}
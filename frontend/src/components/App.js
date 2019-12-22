import React, {Component} from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import TeamList from "./TeamList";
import TeamProvider, {MContext} from "./TeamProvider";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            started: false,
            numberOfTeams: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleChange(event) {
        this.setState({numberOfTeams: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({started: true});
    }


    render() {
        let isStarted = this.state.started;
        let appView;

        const mainStyle = {
            color: "white"
        };

        const form = {
            display: "flex",
            flexDirection: "column",
        };



        if(!isStarted) {
            appView =
                <form style={form} onSubmit={this.handleSubmit} className={"form"}>
                    <div className={"field is-grouped"}>
                        <div className={"control"}>
                            <label>
                                <div className={"subtitle has-text-warning"}>
                                    Number of players:
                                </div>
                            </label>
                            <input type="number" className={"input"} value={this.state.numberOfTeams} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className={"field is-grouped"}>
                        <button className={"button is-link"} type="submit">Submit</button>
                    </div>
                </form>
        } else {
            appView =
                <div>
                    <DataProvider questions="api/questions/"
                                  topics="api/topics/"
                                  render={(q,t) =>
                                      <TeamProvider>
                                          <TeamList numberOfTeams={this.state.numberOfTeams}/>

                                          <Table
                                              numberOfTeams={this.state.numberOfTeams}
                                              topics={t}
                                              questions={q}
                                          />
                                      </TeamProvider>
                                  }
                    />
                </div>

        }

        return (
            <div style={mainStyle}>
                {appView}
            </div>
        )
    }

}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
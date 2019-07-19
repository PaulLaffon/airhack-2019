import React, { Component } from "react";

import WelcomerItem from "./WelcomerItem";
import { relative } from "path";

class WelcomerList extends Component {
  static renderWelcomerList(tasks) {
    return tasks.map(task => <WelcomerItem task={task}/>);
  }

  getSecondTime(time){
    let infos = time.trim().split(":");
    return parseInt(infos[0])*60*60 + parseInt(infos[1])*60;
  }

  getRealTime(second) {
    let h = second/(60*60);
    h = Math.trunc(h);
    let m = second - h*60*60;
    m = m/60;
    if(m == 0)
    {
      return h+":"+m+"0";
    }
    else
    {
      return h+":"+m;
    }
  }

  generateTasks(){

    for(let i = 0;i<this.props.tasks.length;i++)
    {
      let task = this.props.tasks[i];
      task["secondTime"] = this.getSecondTime(task.dueTime);
    }
    
    let tasks = this.props.tasks;
    tasks.sort(function(a,b){return a.secondTime - b.secondTime});
    var res = [];
    for(let i = 0;i<tasks.length;i++)
    {
      tasks[i]["start"] = this.getRealTime(tasks[i].secondTime);
      tasks[i]["end"] = this.getRealTime(tasks[i].secondTime + 30*60);
      tasks[i]["activite"] = "Welcome";
      res.push(tasks[i]);
      if(i+1<tasks.length)
      {
        let t  = {
          start: tasks[i]["end"],
          end : this.getRealTime(tasks[i+1].secondTime),
          activite:"Marche",
          lng : tasks[i+1]["lng"],
          lat : tasks[i+1]["lat"]
        }
        res.push(t);
      }
    }
    return res;
  }

  render() {
    let tasks = this.generateTasks();
    return (
      <div>
        <h2 style={{ marginBottom: "1em", marginTop: "2em" }}>
          <i>Détail welcomer n°{this.props.number}</i>
        </h2>
        
        <div className="next-departure-result-page-header-list tn-text-12">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 text-center">Horaire</div>
            <div className="col-md-5 text-center">Activité</div>
            <div className="col-md-2 text-center" style={{overflow:"hidden"}}>Latitude</div>
            <div className="col-md-2 text-center" style={{overflow:"hidden"}}>Longitude</div>
          </div>
        </div>
        </div>

        <div role="tablist" className="next-departure-result-page ">
          {WelcomerList.renderWelcomerList(tasks)}
        </div>
        <div className="text-center">
          <h2 style={{marginTop:"3em"}}>Carte <small style={{fontSize:"0.3em"}}>(static ->Exemple de fonctionnalité)</small></h2>
        <img
        style={{width:"80%", marginTop:"3em"}}
          src={require("../resources/map.png")}
        />
        </div>
      </div>
    );
  }
}

export default WelcomerList;

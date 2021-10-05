import React from 'react'
import classes from './Members.scss'
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery'
window.jQuery = window.$ = $
require('bootstrap')

export const Members = ({ auth, newGame, leaveGame }) => {
  const checkAuth = () => {
    if (auth.user.flag != 'in') {
      document.getElementsByClassName('access')[0].click()
    }
  }

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="active">
          <a data-toggle="tab" href="#home">
            Play!
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#menu1">
            Leaderboard
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div id="home" className="tab-pane fade in active">
          <div className="container">
            <div className="row">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Active Games List</h4>
                </div>
                <table className="table" id={classes.tableFixed}>
                  <thead className="well">
                    <tr>
                      <th className="col-xs-2">Name</th>
                      <th className="col-xs-6">Level</th>
                      <th className="col-xs-4">Connect</th>
                    </tr>
                  </thead>
                  <tbody id="active">
                    <tr>
                      <td className="col-xs-2">ask2</td>
                      <td className="col-xs-6">
                        <span className="badge">5</span>
                      </td>
                      <td className="col-xs-4">
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          placeholder="Code"
                        />
                        <button
                          type="button"
                          className="btn btn-success btn-xs join"
                          onClick={checkAuth}>
                          GO!
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-xs-2">tensai</td>
                      <td className="col-xs-6">
                        <span className="badge">1</span>
                      </td>
                      <td className="col-xs-4">
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          placeholder="Code"
                        />
                        <button
                          type="button"
                          className="btn btn-success btn-xs">
                          GO!
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-xs-2">Celestial</td>
                      <td className="col-xs-6">
                        <span className="badge">4</span>
                      </td>
                      <td className="col-xs-4">
                        <button
                          type="button"
                          className="btn btn-success btn-xs">
                          GO!
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-xs-2">madMan</td>
                      <td className="col-xs-6">
                        <span className="badge">30</span>
                      </td>
                      <td className="col-xs-4">
                        <button
                          type="button"
                          className="btn btn-success btn-xs">
                          GO!
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-xs-2">superGirl_24</td>
                      <td className="col-xs-6">
                        <span className="badge">7</span>
                      </td>
                      <td className="col-xs-4">
                        <button
                          type="button"
                          className="btn btn-success btn-xs">
                          GO!
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-xs-2">troll99</td>
                      <td className="col-xs-6">
                        <span className="badge">99</span>
                      </td>
                      <td className="col-xs-4">
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          placeholder="Code"
                        />
                        <button
                          type="button"
                          className="btn btn-success btn-xs">
                          GO!
                        </button>
                      </td>
                    </tr>
                    {auth.activeGames.map((g, key) => (
                      <tr>
                        <td className="col-xs-2">{g.user.name}</td>
                        <td className="col-xs-6">
                          <span className="badge">{g.user.rank}</span>
                        </td>
                        <td className="col-xs-4">
                          <input
                            type="text"
                            className="form-control"
                            id={classes[g.isProtected]}
                            placeholder="Code"
                          />
                          <button
                            type="button"
                            className="btn btn-success btn-xs"
                            onClick={checkAuth}>
                            GO!
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={classes.newGame}>
                <a
                  href="#newGame"
                  data-toggle="collapse"
                  id={classes[auth.user.reserved]}>
                  Host New Game
                </a>
                <p id={classes[auth.user.reserved]}>Waiting other players...</p>
                <button
                  type="button"
                  className="btn btn-default"
                  id={classes[auth.user.reserved]}
                  onClick={leaveGame}>
                  Leave Game
                </button>
                <div id="newGame" className="collapse">
                  <form id={classes[auth.user.reserved]}>
                    <p>
                      Leave this field empty if you do not want to restrain
                      access to your game.
                    </p>
                    <div className="form-group">
                      <label htmlFor="pwd">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Enter Password"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => {
                        checkAuth()
                        newGame(document.getElementById('pwd').value)
                      }}>
                      Start!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="menu1" className="tab-pane fade">
          <div className="container">
            <div className="row">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Leaderboard</h4>
                </div>
                <table className="table" id={classes.tableFixed}>
                  <thead className="well">
                    <tr>
                      <th className="col-xs-4">Rank</th>
                      <th className="col-xs-4">Name</th>
                      <th className="col-xs-4">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auth.allUsers.map((u, key) => (
                      <tr>
                        <td className="col-xs-4">{key + 1}</td>
                        <td className="col-xs-4">{u.name}</td>
                        <td className="col-xs-4">
                          <span className="badge">{u.rank}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members

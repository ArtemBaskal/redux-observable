import React from "react";
import { connect } from "react-redux";
import { BeersList } from "./BeersList";
import { search, cancel } from "../reducers/beersActions";
import { setConfig } from "../reducers/configActions";

export function Beers(props) {
  const { status, data, messages, search, cancel, setConfig, config } = props;
  return (
    <div>
      <select
        name="per-page"
        defaultValue={config.perPage}
        onChange={e => setConfig({ perPage: Number(e.target.value) })}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
          <option key={value} value={value}>
            {value} results
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          placeholder="Search beers"
          onChange={evt => search(evt.target.value)}
        />
        {status === "pending" && (
          <div>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <span>Loading </span>
          </div>
        )}
      </div>
      {status === "success" && (
        <div>
          <BeersList beers={data} />
        </div>
      )}
      {status === "failure" && (
        <div>
          <p>Oopsie! {messages[0].text} </p>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.beers,
    config: state.config
  };
}

export default connect(
  mapStateToProps,
  { search, cancel, setConfig }
)(Beers);

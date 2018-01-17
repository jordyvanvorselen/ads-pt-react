import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import queryString from "query-string"
import PriceChart from "./charts/PriceChart"
import SupplyDemandChart from "./charts/SupplyDemandChart"
<<<<<<< HEAD
import Content from "./Content"
=======
import Content from "./Content";
import Mentions from "../containers/Mentions"
>>>>>>> fba58f9b3852f39503c2300d121da4abe50bad34

export default class Detail extends React.Component {
  static propTypes = {
    fetchRsBuddy: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    this.props.fetchRsBuddy(parseInt(id, 10))
  }

  render() {
    const margin = { top: 20, right: 20, bottom: 50, left: 75 }

    return (
      <Content>
        <div
          style={{ gridColumn: "3/11" }}
          ref={wrapper => {
            this.wrapper = wrapper
          }}
        >
          {(() => {
            const width = this.wrapper
              ? this.wrapper.getBoundingClientRect().width
              : 0
            const height = width * (9 / 21)

            if (this.props.loading) return <p>Loading</p>
            else if (this.props.error) return <p>Error</p>
            else {
              return (
                <div class="detail-wrapper">
                  <h2>{this.props.data.name}</h2>

                  <PriceChart
                    data={this.props.data.rsbuddy}
                    xMap={d => new Date(d.timestamp)}
                    yMap={d => parseFloat(d.buyingPrice)}
                    width={width}
                    height={height}
                    margin={margin}
                  />

                  <h2>Supply and demand chart</h2>

                  <SupplyDemandChart
                    data={this.props.data.rsbuddy}
                    xMap={d => new Date(d.timestamp)}
                    yMap1={d => parseFloat(d.buyingCompleted)}
                    yMap2={d => parseFloat(d.sellingCompleted)}
                    width={width}
                    height={height}
                    margin={margin}
                  />
                </div>
              )
            }
          })()}
        </div>

        <Mentions />
      </Content>
    )
  }
}

import PropTypes from "prop-types"
import React from "react"
import queryString from "query-string"
import PriceChart from "./charts/PriceChart"

export default class Detail extends React.Component {
  static propTypes = {
    fetchRsBuddy: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    this.props.fetchRsBuddy(parseInt(id, 10))
  }

  render() {
    if (this.props.loading) return <p>Loading</p>
    else if (this.props.error) return <p>Error</p>
    else {
      const fWidth = 1200
      const fHeight = 600

      const margin = { top: 20, right: 20, bottom: 50, left: 75 }

      return (
        <div>
          <h1>{this.props.data.name}</h1>

          <PriceChart
            data={this.props.data.rsbuddy}
            xMap={d => new Date(d.timestamp)}
            yMap={d => parseFloat(d.buyingPrice)}
            width={fWidth}
            height={fHeight}
            margin={margin}
          />
        </div>
        // <div>
        //   <h1>{this.props.data.name}</h1>
        //   <table>
        //     <tbody>
        //       {this.props.data.rsbuddy.map((transaction, index) => (
        //         <tr key={`transaction-${index}`}>
        //           <td>{transaction.timestamp}</td>
        //           <td>{transaction.buyingPrice}</td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )
    }
  }
}

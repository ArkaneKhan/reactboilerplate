import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { SafeAreaView, Text, Button, TouchableOpacity } from "react-native";
import { push } from "../../services/NavigationService";
import { Metrics } from "../../theme";
import { request } from "../../actions/Login";

class Home extends Component {

  componentDidMount() {
    this.props.request({ email: 'asd@gmail.com', password: '123456' })
  }

  render() {
    console.log(
      "Metrics",
      Metrics.heightRatio(100) + "-" + Metrics.widthRatio(100)
    );
    return (
      <Fragment>
        <SafeAreaView>
          <Text>Home</Text>
          <TouchableOpacity
            onPress={() => push("demo")}
            style={{
              height: Metrics.heightRatio(100),
              width: Metrics.widthRatio(100),
              backgroundColor: "red"
            }}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = { request };
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  actions
)(Home);

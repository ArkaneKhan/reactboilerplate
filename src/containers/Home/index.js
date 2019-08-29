import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { SafeAreaView, Text, Button, TouchableOpacity } from "react-native";
import { push } from "../../services/NavigationService";
import { Metrics } from "../../theme";
// import console = require("console");
class Home extends Component {
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
const actions = {};
const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    actions
)(Home);

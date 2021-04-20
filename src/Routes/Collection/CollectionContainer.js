import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { collectionApi } from "api";

export default class extends React.Component {
  state = {
    loading: true,
    error: null,
    result: null,
  };
  async componentDidMount() {
    try {
      const {
        history,
        match: {
          params: { id },
        },
      } = this.props;
      const parsedId = Number(id);
      if (isNaN(parsedId)) {
        return history.push("/");
      }
      const { data } = await collectionApi.getDetail(id);
      this.setState({ result: data });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return <CollectionPresenter {...this.state} />;
  }
}

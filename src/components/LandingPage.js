import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter  } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import {
  Button,
  Container,
 // Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Ref,
  Transition,
  Visibility
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
class HomepageHeading extends Component {
  state = {
    mobile: this.props,
    hide: 500,
    show: 2500,
    visible: false
  };

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ visible: true });
      }.bind(this),
      1000
    );
  }

  render() {
    const { mobile } = this.props;
    const { visible } = this.state;

    return (
      <Container text>
        <Transition
          animation={"horizontal flip"}
          duration={2200}
          visible={visible}
        >
          <Header
            as="h1"
            content="Hi, I'm Raj."
            inverted
            style={{
              fontSize: mobile ? "2em" : "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: mobile ? "1.5em" : "3em"
            }}
          />
        </Transition>
        <Transition
          animation={"vertical flip"}
          duration={2400}
          visible={visible}
        >
          <Header
            as="h2"
            content="A T shaped Developer."
            inverted
            style={{
              fontSize: mobile ? "1.5em" : "1.7em",
              fontWeight: "normal",
              marginTop: mobile ? "0.5em" : "1.5em"
            }}
          />
        </Transition>
        <center>
          <Transition nimation={"fade"} duration={2700} visible={visible}>
            <div>
              <Button primary size="big">
                Resume
              </Button>{" "}
              <Button positive size="big">
                Projects
              </Button>
            </div>
          </Transition>
        </center>
      </Container>
    );
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {
    calculations: {
      direction: "none",
      height: 0,
      width: 0,
      topPassed: false,
      bottomPassed: false,
      pixelsPassed: 0,
      percentagePassed: 0,
      topVisible: false,
      bottomVisible: false,
      fits: false,
      passing: false,
      onScreen: false,
      offScreen: false
    }
  };

  contextRef = createRef();
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleUpdate = (e, { calculations }) => {
    this.setState({ calculations });
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { calculations } = this.state;

    return (
      <Ref innerRef={this.contextRef}>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
            offset={[10, 10]}
            onUpdate={this.handleUpdate}
            updateOn="repaint"
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 700, padding: "0.5em 0em" }}
              vertical
            >
              <Menu fixed={fixed ? "top" : null} inverted={true} size="large">
                <Container>
                  <Transition
                    visible={calculations.topPassed}
                    animation="fade down"
                    duration={1000}
                  >
                     <Menu.Item as="a" active>
                      Home
                    </Menu.Item>
                  </Transition>
                  <Transition
                    visible={calculations.topPassed}
                    animation="fade down"
                    duration={1500}
                  >
                   <Menu.Item as="a">Work</Menu.Item>
                  </Transition>
                  <Transition
                    visible={calculations.topPassed}
                    animation="fade down"
                    duration={1000}
                  >
          <Link to='/contact'> <Menu.Item active>
            Contacts
                    </Menu.Item></Link> 
                  </Transition>
                  <Transition
                    visible={calculations.topPassed}
                    animation="scale"
                    duration={1500}
                  >
                    <Menu.Item position="right">
                      <Button as="a" inverted={!fixed}>
                        Log in
                      </Button>
                      <Button
                        as="a"
                        inverted={!fixed}
                        primary={fixed}
                        style={{ marginLeft: "0.5em" }}
                      >
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Transition>
                </Container>
              </Menu>

              <HomepageHeading />
            </Segment>
          </Visibility>

          {children}
        </Responsive>
      </Ref>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class HomepageLayout extends Component {
  state = {
    calculations: {
      direction: "none",
      height: 0,
      width: 0,
      topPassed: false,
      bottomPassed: false,
      pixelsPassed: 0,
      percentagePassed: 0,
      topVisible: false,
      bottomVisible: false,
      fits: false,
      passing: false,
      onScreen: false,
      offScreen: false
    }
  };

  contextRef = createRef();
  handleUpdate = (e, { calculations }) => {
    this.setState({ calculations });
  };

  render() {
    const { calculations } = this.state;

    return (
      <ResponsiveContainer>
        <Visibility onUpdate={this.handleUpdate} updateOn="repaint">
          <Segment style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Transition
                    visible={calculations.onScreen}
                    animation="fade up"
                    duration={1000}
                  >
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      We Help Companies and Companions
                    </Header>
                  </Transition>
                  <Transition
                    visible={calculations.onScreen}
                    animation="fade up"
                    duration={1200}
                  >
                    <p style={{ fontSize: "1.33em" }}>
                      We can give your company superpowers to do things that
                      they never thought possible. Let us delight your customers
                      and empower your needs... through pure data analytics.
                    </p>
                  </Transition>


         
                  <Transition
                    visible={calculations.onScreen}
                    animation="fade up"
                    duration={1400}
                  >
                    <div>
                      <Header as="h3" style={{ fontSize: "2em" }}>
                        We Make Bananas That Can Dance
                      </Header>
                      <p style={{ fontSize: "1.33em" }}>
                        Yes that's right, you thought it was the stuff of
                        dreams, but even bananas can be bioengineered.
                      </p>
                    </div>
                  </Transition>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image
                    bordered
                    rounded
                    size="large"
                    src="/images/wireframe/white-image.png"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Transition
                    visible={calculations.onScreen}
                    animation="fade up"
                    duration={1400}
                  >
                    <center>
                      <Button size="huge">Check Them Out</Button>
                    </center>
                  </Transition>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment inverted vertical style={{ padding: "5em 0em" }}>
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="About" />
                    <List link inverted>
                      <List.Item as="a">Sitemap</List.Item>
                      <List.Item as="a">Contact Us</List.Item>
                      <List.Item as="a">Religious Ceremonies</List.Item>
                      <List.Item as="a">Gazebo Plans</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="Services" />
                    <List link inverted>
                      <List.Item as="a">Banana Pre-Order</List.Item>
                      <List.Item as="a">DNA FAQ</List.Item>
                      <List.Item as="a">How To Access</List.Item>
                      <List.Item as="a">Favorite X-Men</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Header as="h4" inverted>
                      Footer Header
                    </Header>
                    <p>
                      Extra space for a call to action inside the footer that
                      could help re-engage users.
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </Visibility>
      </ResponsiveContainer>
    );
  }
}

const mapStateProps = state => {
  return {
    //   authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

//   const mapDispatchToProps = dispatch => {
//     // return {
//     //   signIn: creds => dispatch(signIn(creds))
//     // };
//   };

export default withRouter(connect(
  mapStateProps,
  null
)(HomepageLayout));

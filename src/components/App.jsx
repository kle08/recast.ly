import Search from "./Search.js";
import VideoList from "./VideoList.js";
import VideoPlayer from "./VideoPlayer.js";
import exampleVideoData from "../data/exampleVideoData.js";
import YOUTUBE_API_KEY from "../config/youtube.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: exampleVideoData[0],
      videos: exampleVideoData,
      query: "pomeranian fail"
    };

    this.whenClick = this.whenClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getVideos = this.getVideos.bind(this);
  }

  componentDidMount() {
    this.getVideos();
  }

  whenClick(selectedVideo) {
    this.setState({
      currentVideo: selectedVideo
    });
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });

    var liveSearch = _.debounce(this.getVideos, 500, true);
    liveSearch();
  }

  handleSubmit() {
    this.getVideos();
  }

  getVideos() {
    var options = {
      key: YOUTUBE_API_KEY,
      query: this.state.query,
      max: 5
    };

    this.props.searchYouTube(options, data => (
      this.setState({
        videos: data,
        currentVideo: data[0]
      })
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div>
              <Search
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                value={this.state.query}
              />
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div>
              <VideoPlayer video={this.state.currentVideo} />
            </div>
          </div>
          <div className="col-md-5">
            <div>
              <VideoList
                whenClick={this.whenClick}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

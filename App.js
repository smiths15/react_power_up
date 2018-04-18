import React from 'react';




// export default class App extends React.Component {
//   render() {
//     return(
//       <h2>Hello World!</h2>
//       );
//   } 
// }

class Comment extends React.Component {
  render() {
    return(
      <div className = "comment">
        <p className="comment-header">{this.props.author} </p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <p className="comment-footer">
          <a href="#" className="comment-footer-delete">
          Delete Comment
          </a>
        </p>
      </div>
      );
  }
}

export default class CommentBox extends React.Component {
  constructor(){
    super();

    this.state = {showComments: false};
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';
    
    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = <div className="comment-list">{comments}</div>
    }

    return(
      <div className = "comment-box">
        <button type="button" className="btn btn-primary btn-sm float-right" onClick={this._handleClick.bind(this)}>
        {buttonText}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count"> {this._getCommentsTitle(comments.length)}</h4>
        {commentNodes}
      </div>
    );

  }

  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    const commentList = [
      {id: 1, author: 'Morgan McCircuit', body: 'Great picture!'},
      {id: 2, author: 'Bending Bender', body: 'Excellent stuff!'}
    ];

    return commentList.map((comment)=> {
      return (
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount == 0) {
      return 'No comments yet';
    } else if (commentCount == 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }




}

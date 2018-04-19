import React from 'react';




// export default class App extends React.Component {
//   render() {
//     return(
//       <h2>Hello World!</h2>
//       );
//   } 
// }

//Comment component
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


class CommentForm extends React.Component {
  render() {
    return(
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the Discussion</label>
        <div className="form-group comment-form-fields">
          <input placeholder="Name:" className="form-control" ref={(input) => this._author = input}/>
          <br />
          <textarea placeholder="Comment:" className="form-control" ref={(textarea) => this._body = textarea}>
          </textarea>
        </div>
        <div className="comment-form-actions form-group">
          <button type="submit" className="btn btn-primary btn-sm">
            Post Comment
          </button>
        </div>
      </form>
      );
  }


  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}



export default class CommentBox extends React.Component {
  constructor(){
    super();

    this.state = {
      showComments: false,
      comments: [
      {id: 1, author: 'Morgan McCircuit', body: 'Great picture!'},
      {id: 2, author: 'Bending Bender', body: 'Excellent stuff!'}
      ]
    };
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';
    
    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <button type="button" className="btn btn-primary btn-sm float-right" onClick={this._handleClick.bind(this)}>
        {buttonText}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count"> {this._getCommentsTitle(comments.length)}</h4>
        {commentNodes}
      </div>
    );

  }

  _addComment(author, body){
    const comment = {
      id: this.state.comments.length +1,
      author,
      body
    };
    this.setState({comments: this.state.comments.concat([comment]) }); 
  }

  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    
    return this.state.comments.map((comment)=> {
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

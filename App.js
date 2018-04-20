import React from 'react';



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
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
          Delete Comment
          </a>
        </p>
      </div>
      );
  }
  _handleDelete(e){
    e.preventDefault();
    
    if (confirm('Are you sure?')) {
      this.props.onDelete(this.props.id);    
    }  
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
      comments: []
    };
  }

  componentWillMount(){
    this._fetchComments();
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
//Polling or checking server for updated data every 5 secs
  componentDidMount(){
    this._timer = setInterval(
      ()=> this._fetchComments(),
      10000
    );
  }
//Runs when component is about to be removed from the DOM (e.g., change pages)
  componentWillUnmount(){
    clearInterval(this._timer);
  }

  //Making ajax request to server to get data
  _fetchComments(){
    jQuery.ajax({
      method: 'GET',
      url: 'comments.json',
      success: (comments) => {
        this.setState({comments})
      }
    });
  }

  //Method to delete comments
  _deleteComments(commentID){
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
      );
    this.setState({comments});
  }

  _addComment(author, body){
    const comment = {author, body};

    jQuery.post('./comments.json', {comment}).then(comment =>{
      this.setState({comments: this.state.comments.concat([comment]) }); 
    });
    
  }
  

  //updates button string when clicked
  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    return this.state.comments.map((comment)=> {
      return (
        <Comment 
        author={comment.author}
        body={comment.body}
        key={comment.id}
        onDelete={this._deleteComments.bind(this)} />
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

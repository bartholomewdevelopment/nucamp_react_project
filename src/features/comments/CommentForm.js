import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import { useDispatch } from 'react-redux'; // Importing useDispatch from react-redux
import { addComment } from '../../features/comments/commentsSlice'; // Importing addComment from commentsSlice
import { validateCommentForm } from '../../utils/validateCommentForm'; 

const CommentForm = ({ campsiteId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch(); // Declaring const dispatch and assigning useDispatch()

  const handleSubmit = (values) => {
    const comment = {
      campsiteId: parseInt(campsiteId),
      rating: values.rating,
      author: values.author,
      text: values.commentText,
      date: new Date(Date.now()).toISOString() // Adding date property to the comment object
    };
    console.log(comment); 
    dispatch(addComment(comment)); // Dispatching addComment action with the comment object
    setModalOpen(false); 
  };

  return (
    <>
      <Button outline onClick={() => setModalOpen(true)}>
        <i className='fa fa-pencil fa-lg' /> Add Comment
      </Button>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(false)}>Add Comment</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ rating: undefined, author: '', commentText: '' }}
            onSubmit={handleSubmit}
            validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor='rating'>Rating</Label>
                <Field name='rating' as='select' className='form-control'>
                  <option>Select...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Field>
                <ErrorMessage name='rating' component='div' className='text-danger' />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='author'>Your Name</Label>
                <Field name='author' placeholder='Your Name' className='form-control' />
                <ErrorMessage name='author' component='div' className='text-danger' />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='commentText'>Comment</Label>
                <Field name='commentText' as='textarea' rows='12' className='form-control' />
              </FormGroup>
              <Button type='submit' color='primary'>Submit</Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CommentForm;

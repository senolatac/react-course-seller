import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Course from '../models/course';
import CourseService from '../services/course.service';
import { Modal } from 'react-bootstrap';


const CourseSave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showCourseModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));

    //send it from parent
    useEffect(() => {
        setCourse(props.course);
    }, [props.course]);

    const [course, setCourse] = useState(new Course('', '', 0));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveCourse = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if(!course.title || !course.subtitle || !course.price) {
            return;
        }

        CourseService.saveCourse(course).then(response => {
            //...
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);
        }).catch((err) => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        })
    };

    //<input name="" onChange=(evvent) => handlechange(event)>
    const handleChange = (e) => {
        const {name, value} = e.target;

        setCourse((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    return (
        <Modal show={show}>
            <form onSubmit={(e) => saveCourse(e)}
            noValidate
            className={submitted ? 'was-validated' : ''}>

                <div className="modal-header">
                    <h5 className="modal-title">Course Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                    }

                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            className="form-control"
                            required
                            value={course.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            Title is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subtitle">Subtitle: </label>
                        <input
                            type="text"
                            name="subtitle"
                            placeholder="subtitle"
                            className="form-control"
                            required
                            value={course.subtitle}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            Subtitle is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            min="1"
                            step="any"
                            name="price"
                            placeholder="price"
                            className="form-control"
                            required
                            value={course.price}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            Price is required and should be greater than 0.
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>

            </form>
        </Modal>
    );
});

export {CourseSave};

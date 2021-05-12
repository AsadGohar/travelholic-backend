import React, { useEffect, useState } from 'react';
import axios, { imagePath } from "../support-components/axios";
import { produce } from "immer";
import Loader from "../support-components/Loader"
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';

const EditDestination = (props) => {
    const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
    const [title, setTitle] = useState('');
    const [titleImage, setTitleImage] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [guidelines, setGuidelines] = useState('');
    const [history, setHistory] = useState('');
    const [attractions, setAttractions] = useState([{ title: "", path: "" }])
    const [photos, setPhotos] = useState([{ path: "" }]);
    const [uploading, setUploading] = useState(false)


    // Setting state to current destination details
    useEffect(() => {
        axios.get("/destinations/" + props.match.params.id)
            .then(res => {
                setTitle(res.data.title);
                setTitleImage(res.data.title_image);
                setIntroduction(res.data.introduction);
                setGuidelines(res.data.guidelines);
                setHistory(res.data.history);
                setAttractions(res.data.attraction_photos);
                setPhotos(res.data.photos);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [props.match.params.id])

    // Setting functions
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeTitleImage = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/upload', formData, config)
            setTitleImage(data)

            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)

        }
    }


    const onChangeIntro = (e) => {
        setIntroduction(e.target.value);
    }
    const onChangeGuidelines = (e) => {
        setGuidelines(e.target.value);
    }
    const onChangeHistory = (e) => {
        setHistory(e.target.value);
    }

    const onChangeAttractionPhotos = async (e, index) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/upload', formData, config)
            setAttractions(currentAttractions => produce(currentAttractions, v => {
                v[index].path = data;
            }));
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const onChangePhotos = async (e, index) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/upload', formData, config)
            setPhotos(currentPhotos => produce(currentPhotos, v => {
                v[index].path = data;
            }));

            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)

        }
    }


    // Functions for destination attractions
    const handleAddAttraction = () => {
        setAttractions(currentAttractions => [...currentAttractions, { title: "", path: "" }]);
        console.log(attractions);
    }
    // const handleRemoveAttraction = () => {
    //     setAttractions(currentAttractions =>
    //         currentAttractions.filter(a => a.index !== attractions.index));
    // }

    // Functions for destination photos
    const handleAddPhoto = () => {
        setPhotos(currentPhotos => [...currentPhotos, { path: "" }]);
        // console.log(photos)
    }
    // const handleRemovePhoto = () => {
    //     setPhotos(currentPhotos =>
    //         currentPhotos.filter(x => x.index !== photos.index)
    //     );
    // }


    const submitDestination = (e) => {
        e.preventDefault()

        const destinationObject = {
            title: title,
            title_image: titleImage,
            introduction: introduction,
            attraction_photos: attractions,
            photos: photos,
            guidelines: guidelines,
            history: history
        };

        axios.put('/destinations/' + props.match.params.id, destinationObject,{
            headers: {
              Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
            }
           })
            .then(res => {
                toast.success("Destination Updated", {
                    position: toast.POSITION.TOP_CENTER
                  });
            });


        // Redirecting to view Page
        props.history.push('/all-destinations')

    }

    return (
        <div className="container add-destination-wrap">
            <div className="row">
                <h5 className="Display-1">Edit destination:</h5>
            </div>
            <div className="row add-destination-form-div mt-3">
                <div className="col-md-7">
                    <form onSubmit={submitDestination}>
                        {/* EDIT DESTINATION NAME */}
                        <div className="form-group">
                            <label for="destination-title">Destination name</label>
                            <input type="text" className="form-control" id="destination-title" value={title} onChange={onChangeTitle} aria-describedby="destination title" placeholder="destination title" />
                        </div>

                        {/* EDIT TITLE IMAGE */}
                        <div className="form-group">
                            <label htmlFor="title-image">Title Image</label><br />
                            <input type="file" id="title-image-file" label="Choose File" onChange={onChangeTitleImage} />
                            <p style={{ fontSize: '12px', color: 'green' }}>{titleImage}</p>
                            {titleImage && <img alt='load' src={`${imagePath}/${titleImage}`} width={100} />}
                            {uploading && <Loader />}
                        </div>

                        {/* EDIT INTRO */}
                        <div className="form-group">
                            <label htmlFor="introduction">Introduction</label>
                            <textarea rows="4" className="form-control" id="introduction" value={introduction} onChange={onChangeIntro} aria-describedby="destination intro" placeholder="Write short destination introduction (max 150 words)" />
                        </div>

                        {/* INSERT ATTRACTION PHOTOS */}
                        <div className="form-group">
                            <label htmlFor="photos">Add attractions photos</label>
                            <div className="border border-dark">
                                {attractions.map((attraction, index) => (
                                    <div className="attractions-input-div p-3" key={index}>

                                        <input type="text" className="form-control mb-2" value={attraction.title} onChange={e => {
                                            const title = e.target.value;
                                            setAttractions(currentAttractions => produce(currentAttractions, v => {
                                                v[index].title = title;
                                            }));
                                        }} placeholder="Attraction name"></input>

                                        <input type="file" id="attractions-file" label="Choose File" onChange={e => onChangeAttractionPhotos(e, index)} />

                                        {attraction.path && <img alt='load'src={`${imagePath}/${attraction.path}`} width={60} />}
                                        <p style={{ fontSize: '12px', color: 'green' }}>{attraction.path}</p>
                                        {uploading && <Loader />}
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddAttraction} className="btn btn-success mt-1 mb-3 ml-3">Add another attraction</button>
                                {/* <button className="btn btn-danger mt-1 mb-3 ml-3">Clear  <i onClick={handleRemoveAttraction} className="fa fa-trash" aria-hidden="true" /></button> */}
                            </div>
                        </div>

                        {/* INSERT PHOTOS */}
                        <div className="form-group">
                            <label htmlFor="photos">Add destination photos</label>
                            <div className="border border-dark">
                                {photos.map((photo, index) => (
                                    <div className="photos-input-div p-3" key={index}>
                                        <input type="file" id="photos-file" label="Choose File" onChange={e => onChangePhotos(e, index)} />
                                        {photo.path && <img alt='load'src={`${imagePath}/${photo.path}`} width={60} />}
                                        <p style={{ fontSize: '12px', color: 'green' }}>{photo.path}</p>
                                        {uploading && <Loader />}
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddPhoto} className="btn btn-success mt-1 mb-3 ml-3">Add another photo</button>
                                {/* <button className="btn btn-danger mt-1 mb-3 ml-3">Clear  <i onClick={handleRemovePhoto} className="fa fa-trash" aria-hidden="true" /></button> */}
                            </div>
                        </div>

                        {/* EDIT GUIDELINES */}
                        <div className="form-group">
                            <label htmlFor="guidelines">Guidelines</label>
                            <textarea rows='4' className="form-control" id="guidelines" value={guidelines} onChange={onChangeGuidelines} aria-describedby="destination guidelines" placeholder="Write guidelines for destinations" />
                        </div>

                        {/* EDIT HISTORY */}
                        <div className="form-group">
                            <label htmlFor="history">History</label>
                            <textarea rows='4' className="form-control" id="history" value={history} onChange={onChangeHistory} aria-describedby="destination history" placeholder="Write history for destinations" />
                        </div>

                        <button type="submit" className="btn btn-dark mb-5">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditDestination;

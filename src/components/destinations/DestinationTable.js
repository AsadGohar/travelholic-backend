import React from 'react';
import { Link } from 'react-router-dom';
import axios, { imagePath } from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';


const DestinationTable = (props) => {
    const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    const { _id, title, title_image, rating, introduction, attraction_photos, photos, guidelines, history, createdAt, updatedAt } = props.data
    const onDelete = props.onDelete;
    const deleteDestination = () => {
        axios.delete('/destinations/' + props.data._id,{
            headers: {
              Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
            }
           })
            .then((res) => {
                toast.success("Destination Deleted", {
                    position: toast.POSITION.TOP_CENTER
                  });
                onDelete();
            }).catch((error) => {
                console.log(error)
            })
    }

    const attractions = attraction_photos.map(attraction => (
        <div className="row mt-1" key={attraction._id}>
            <div className="col-3">
                <a rel="noreferrer" href={`${imagePath}/${attraction.path}`} target="_blank"><img alt='loading' src={`${imagePath}/${attraction.path}`} width='50px' /></a>
            </div>
            <div className="col-9">
                <p style={{ fontSize: '13px' }}>{attraction.path}</p>
            </div>
            <p className="ml-3" style={{ fontWeight: '500' }}>{attraction.title}</p>
        </div>
    ))

    const photosList = photos.map(photo => (
        <div className="row mt-1" key={photo._id}>
            <div className="col-3">
                <a rel="noreferrer" href={`${imagePath}/${photo.path}`} target="_blank"><img src={`${imagePath}/${photo.path}`} alt='loading' width='50px' /></a>
            </div>
            <div className="col-9">
                <p style={{ fontSize: '13px' }}>{photo.path}</p>
            </div>
        </div>
    ))

    return (
        <tr>
            <td>{_id}</td>
            <td>{title}</td>
            <td>{<a rel="noreferrer" href={`${imagePath}/${title_image}`} target="_blank"><img alt='loading' src={`${imagePath}/${title_image}`} width='70px' /></a>}</td>
            <td>{rating.toFixed(2)}</td>
            <td>{introduction}</td>
            <td>{attractions}</td>
            <td>{photosList}</td>
            <td>{guidelines}</td>
            <td>{history}</td>
            <td>{createdAt.substring(0, 10)}</td>
            <td>{updatedAt.substring(0, 10)}</td>
            <td style={{ columnWidth: 200 }}>
                <Link className="edit-link mr-2 ml-3" to={"/edit-destination/" + props.data._id}>
                    <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                </Link>
                <i className='btn fa fa-trash fa-2x' onClick={e => { deleteDestination() }} style={{ cursor: 'pointer', color: 'red' }}></i>
            </td>
        </tr>
    );
}

export default DestinationTable;

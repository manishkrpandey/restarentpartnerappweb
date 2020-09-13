import React, {useState , useEffect} from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {addRestraurentMenu} from '../../Store/action/Action'
import { storage } from "../../service/firebase";
import { useSelector , useDispatch} from "react-redux";
import './AddMenu.css'
const menuCategoryType = {
    0:'M',
    1:'B',
    2:'D'
}
function Addmenu() {
    const dispatch = useDispatch()
    const resMenuData = useSelector(state => state.reducer.resMenu)
    const resId = resMenuData && resMenuData.restarentId ? resMenuData.restarentId : '';
    const [status, setstatus] = React.useState({
        item: true,
    });
    const [foodType, setfoodType] = React.useState({
        veg: true,
    });
    const [dishType, setdishType] = React.useState('1');
    const [dishName, setdishName] = React.useState('');
    
    const allInputs = {imgUrl: ''}
    const [imageFileData, setimageFileData] = React.useState('');
    const [imageAsUrl, setImageAsUrl] = useState('');

    const [dishVarient, setdishVarient] = React.useState([{name:'full', price:0}]);
    const quantityTypeArray = {
        plate :['full', 'half' , 'quater'],
        Kilo :['250gm', '500gm' , '1000gm',],
        piece : [1]
    }
    const [quantityType , setquantityType] = useState('plate');
    const [validishName, setvalidishName] = React.useState('')
    const [validPrice, setvalidPrice] = React.useState([])
    const handleChange = (event) => {
        setfoodType({ ...foodType, [event.target.name]: event.target.checked });
    };
    const handleStatus = (event) => {
        setstatus({ ...status, [event.target.name]: event.target.checked });
    };
    const handleDishType = (event) =>{
        setdishType(event.target.value)
    }
    const setDishname = (event) =>{
        setvalidishName('')
        setdishName(event.target.value)
    }
    const handledishQty = (event) =>{
        setquantityType(event.target.value)
    }
    const handledquantityValue =(event , index , type) =>{
        let copyVarient = [...dishVarient]
        copyVarient[index][type] = event.target.value
        setdishVarient(copyVarient => [...copyVarient])
    }
    const handlePrice =(event , index , type)=>{
        setvalidPrice('')
        let priceVarient = [...dishVarient]
        priceVarient[index].price = ++event.target.value
        setdishVarient(priceVarient)
        console.log('event.target.value',priceVarient);
    }
    const createVarient = (e, index) =>{
        setdishVarient(dishVarient => [...dishVarient , {name:'full', price:0}])
    }
    const removeVarient = (index) =>{
        let copyVarient = [...dishVarient]
        if(dishVarient.length > 1){
            copyVarient.splice(index , 1)
            setdishVarient(copyVarient)
        } 
        else{
            return
        }  
    }
    const handleMenuImage = (event) =>{
        let imageData = event.target.files[0];
        setimageFileData(imageFile => (imageData))
    }
    const validField =() =>{
        if(!dishName){
            setvalidishName('Add dish Name')
        }
    }
    const handleImage =(e)=>{
        e.preventDefault();
        if(imageFileData === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageFileData)}`)
        }
        const uploadTask = storage.ref(`/images/${imageFileData.name}`).put(imageFileData)
        uploadTask.on('state_changed', 
            (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
            }, (err) => {
            //catches the errors
            console.log(err)
            }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage.ref('images').child(imageFileData.name).getDownloadURL()
            .then(fireBaseUrl => {
                console.log(fireBaseUrl,'fireBaseUrl');
                setImageAsUrl(fireBaseUrl);
            })
        })
    }
    const saveMenuData =(e)=>{
        validField()
        if(!validishName){
            let mId = resId + menuCategoryType[dishType] + '_' + (resMenuData.category[dishType].menuitems.length)
            let menuCategory = {
                type:dishType,
                veg:foodType.veg,
                menuId: mId,
                name: dishName,
                status:status.item,
                imageUrl: imageAsUrl,
                variant: dishVarient
            }
            dispatch(addRestraurentMenu(menuCategory,dishType));
            fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(
                (result) =>{
                    setdishName('')
                    setImageAsUrl('')
                    // dishVarient.map((key , index) => {
                    //     if(dishVarient[index].price){
                    //         let priceVarient = [...dishVarient]
                    //         priceVarient[index]['price'] = 0
                    //         setdishVarient(priceVarient => [...priceVarient])
                    //     }
                    // })  
                },
                (error) =>{
                    alert(error)
                }
            )
        }
    }
    return(
      <div className="pt-3 addMenu">
        <h2>Configure Menu</h2>
        <div className="wrapper">
            <div className="row">
                <div className="col">
                    <input type="text" placeholder="Dish Name" className="form-control" id="dishName" onChange={setDishname} value={dishName} />
                    <p className="showError">{validishName}</p>
                </div>
            </div>
            <div className="row">
                <div className="col text-right">
                    <FormGroup row>
                        <FormControlLabel
                            control={<Switch color="primary" checked={status.item} onChange={handleStatus} name="item" />}
                            label="Status"
                        />
                        <FormControlLabel
                            control={<Switch checked={foodType.veg} onChange={handleChange} name="veg" />}
                            label="Non Veg"
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Select Dish Type</label>
                        <select className="custom-select" value={dishType} required onChange={handleDishType}>
                            <option value="0">Deserts</option>
                            <option value="1">Meal</option>
                            <option value="2">Breakfast</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Select Quantity Type</label>
                        <select className="custom-select" value={quantityType} required onChange={handledishQty} required>
                            <option value="plate">plate</option>
                            <option value="Kilo">Kilo</option>
                            <option value="piece">piece</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label>Select menu Image</label>
                        <input type="file" className="custom-select" required onChange={handleMenuImage} required />
                    </div>
                </div>
                {
                    imageFileData ?(
                    <>
                    <div className="col-6 mb-3">
                        {imageAsUrl ?(<><div className="imageWraper">
                            <img src={imageAsUrl} />
                        </div></>):('')}
                    </div>
                    <div className="col-6 col-6 mb-3 d-flex justify-content-end">
                        <button className="btn btn-primary btnHeight" onClick={handleImage}>Upload</button>
                    </div>
                    </>
                    ):('')
                }
            </div>
            <div> 
                {
                    dishVarient.map((varient , index) => (
                        <div className="card mb-1" id={'card'+ index} key={index}>
                            <div className="card-body p-2">
                                <div className="form-row">
                                    <div className="col-4">
                                        <select className="custom-select" required value={dishVarient[index].name} required onChange={(e) => handledquantityValue(e , index ,'name')} >
                                            {
                                                quantityTypeArray[quantityType].map(qty => (
                                                <option key={qty}  value={qty} >{qty}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" placeholder="price" value={dishVarient[index].price} onChange={(e) => handlePrice(e , index , 'price')} className="form-control" id={'price' + index} />
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        {   dishVarient.length === 1 ?(
                                                <>
                                                <button className="btn btn-primary btnHeight" id={'cardButton'+ index} onClick={(e) => createVarient(e, index)}>+</button>
                                                </>
                                            ):
                                            quantityTypeArray[quantityType].length > dishVarient.length  ?(
                                                <>
                                                <button className="btn btn-primary btnHeight" id={'cardButton'+ index} onClick={(e) => createVarient(e, index)}>+</button>
                                                <button className="btn btn-danger ml-2 btnHeight" onClick={() => removeVarient(index)} >-</button>
                                                </>
                                            ):(
                                                <button className="btn btn-danger btnHeight" onClick={() => removeVarient(index)} >-</button>
                                            )
                                        }
                                    </div>
                                </div>  
                            </div>
                        </div>
                    ))
                }
                {validPrice ?(
                        <div className="showError">{validPrice}</div>
                    ):('')}
            </div>
            <div className="mt-3 text-right">
            <Button variant="contained" color="primary" onClick={(e) => saveMenuData(e)}>
                Save Menu
            </Button>
        </div>
        </div>
      </div>
    )
}
export default Addmenu
import React, { Component, useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
  } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

var firstTimeLoad = false;

  const App = () => {
    
    const options  = {
      title: 'Select a Photo',
      takePhotoButtonTitle: 'Take a photo',
      chooseFromLibraryButtonTitle: 'Choose from gallery',
      quality: 1
    };

    const [imageSource, setImageSource] = useState(null);
    const [data, setData] = useState(null);
    const [selectImageButton, setSelectImageButton] = useState("Select Image");
    const [uploadImageButton, setUploadImageButton] = useState("Upload");
    const [screen, setScreen] = useState("");
    const [screentext, setScreenText] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!firstTimeLoad){
            setScreen("Upload Images"); // uploadImages, showImages (STARTING SCREEN)
            setScreenText("Show Images");
            firstTimeLoad = true;
        }
    })
    
    async function fetchImages(){
        setLoading(true);

        await fetch("http://88.193.165.145:723/imageupper/PHP/ShowAllImages.php")//Function returns a value, which is a parameter
        .then(parameter=>parameter.json())//to the next part (parameter). And parameter.json() returns a value, which is a parameter
        .then(anotherParameter=>setImages(anotherParameter));//to the next (anotherParameter), which is set to movies

        setLoading(false);
    }

    async function refresh(){
        await fetch("http://88.193.165.145:723/imageupper/PHP/sendAllImagesAsLinksToDatabase.php");
    }

    function selectPhoto(){
        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel){
                // Error
            }
            else if(response.error){
                // Error
            }
            else {
                let source = { uri: response.uri };
 
                setImageSource(source);
                setData(response.data);
                setSelectImageButton("Choose another image");
            }
        });
    }

    function uploadPhoto(){
      // If no image selected
      if(data == null){
          alert("Please select your imagae first");
          return;
      }
      RNFetchBlob.fetch('POST', "http://88.193.165.145:723/imageupper/PHP/uploadImage.php", {
        'Content-Type': 'multipart/form-data',
      }, [ 
          {name: 'image', filename: 'image.png', type: 'image/png', data: data}
        ]) .then((resp) => {
          alert(resp.text());
        }).catch((err) => {
          alert(err);
        });
        
        /*
        this.setState({
            imageSource: null,
            data: null,
            selectImageButton: "Select image"
        })
        */

        setImageSource(null);
        setData(null);
        setSelectImageButton("Select image");
    }

    async function SwitchScreen(){
        if(screen == "Upload Images"){
            setImages(null);
            setScreen("Show Images");
            setScreenText("Upload Images");   

            await fetchImages();  
            refresh();
        }

        else if(screen == "Show Images"){
            setScreen("Upload Images");    
            setScreenText("Show Images");
        }

    }


return (          
       
    <View style={styles.container}>
    <TouchableOpacity style={styles.buttonTop} onPress={() => SwitchScreen()} >
        <Text style={styles.buttonText}>{screentext}</Text>         
    </TouchableOpacity>


{/* Upload Image Screen */}
              {screen == "Upload Images" &&
              <View style={styles.container}>
                          
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>----------------------------------------------- </Text>
                </View>
              
                <Image style={styles.image}
                    source={imageSource != null ? imageSource : require('./images/error.png')}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={selectPhoto.bind(this)}>
                      <Text style={styles.text}> {selectImageButton} </Text>
                    </TouchableOpacity>
                          
                    {data != null && 
                    <TouchableOpacity style={styles.button} onPress={() => uploadPhoto()}>
                        <Text style={styles.text}> {uploadImageButton} </Text>
                    </TouchableOpacity>
                    }

                </View>     
              </View>
        }

{/* Show all images screen */}
        {screen == "Show Images" &&   
        <View style={styles.container}>
        {images != null && 

            <FlatList
                Style={styles.flatList}
                data={images}
                initialScrollIndex={images.length - 1}
                // data={movies.movies}
                renderItem={({item}) => (
                  <View style={styles.listItem}>
                    
                    {/* <Text>{item.id}) {item.title}, {item.releaseYear}</Text> */}
                    <Text>{/* item.get_image */}</Text>
                    <Image style={styles.image_show} source={{uri: item.get_image}} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            /> 
        }

        {loading &&
            <ActivityIndicator size="large" color="blue"/>
        }

        </View>             
        }

      </View>      
    );
  }

const styles = StyleSheet.create({

    headerContainer:{
        position: 'absolute',
        top: 0
    },
    header:{
        fontSize: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        width: 450,
        height: 50,
        marginTop: 5,
        backgroundColor: '#2681ff',
        borderRadius: 30,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 0
    },
    text:{
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    image:{
        width: 400,
        height: 400,
        marginTop: 30,
    },
    image_show:{
        height: 300,
        width: 400,
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 6,
    },
    listItem:{

    },

    buttonTop:{
        alignSelf: 'stretch',
        width: '100%',
        height: 45,
        backgroundColor: '#2681ff',
        textAlign: 'center',   
        justifyContent: 'center',
    },
    buttonText:{
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },

    buttonTopContainer:{
        flex: 1,  
        padding: 255,  
        backgroundColor: "#2681ff",  
        justifyContent: "flex-start",
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList:{
        marginTop: 50,
        padding: 0,
        
    }

});

export default App;


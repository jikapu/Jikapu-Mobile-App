//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React,{useState} from 'react';
import { StyleSheet, Text, Pressable, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { typography, spacing } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '@/constants'



export const ImageCarousel = (props) => {
    const window = useWindowDimensions().width
    const [activeIndex,setActiveIndex] = useState(1)
    let { images, imageStyle } = props;
    return (
        <View>
            <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={window - 20}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold:50,
                    
                }}
                renderItem={({ item, index }) => (
                    <Image source={images} style={[styles.imageSlide, imageStyle]} />
                )}
            />
            <View style={styles.dots}>
            {images.map((image, index) => (
                <View style={[styles.dot,{
                    backgroundColor: index = activeIndex ? "#EEB600" :"#D8D8D8"
                }]}/>
            ))}
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    imageSlide: {
        width: window - 40,
        height: 250,
        margin: 10,
        resizeMode: "contain"
    },
    dots:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    dot:{
        width:25,
        height:25,
        borderRadius:25,
        backgroundColor:"#EEB600",
        margin:5
    }
});
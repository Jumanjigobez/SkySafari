
import { StyleSheet, Dimensions } from 'react-native';


export const rootColors = {
    
    primarybg: "#1D71F2",
    primarybtn: "#DDB130",

    white: "#fff",
    black: "000",
    red: "red",
    
    errorColor: "000",

    transparentWhite: "rgba(255,255,255,0.3)",
    transparentblack: "rgba(0,0,0,0.4)",

}

const height = Dimensions.get("window").height,
    width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    /* Welcome Screen */
    main:{
        // backgroundColor: rootColors.primarybg,
        flex: 1,
        padding: 5,
        paddingTop: height * 0.05,
        resizeMode: "cover",
        
       
    },
    container:{
        // borderWidth: 2,
        // backgroundColor: "red",
        height: height,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
       
        
    },
    logo_part:{
        
        height: height * 0.5,
        width: width,
        position: "relative"
    },
    logo_img:{
       
        height: height * 0.6,
        width: width,
        position: "absolute",
        top: "-20%"
    },
    text_part:{
        // backgroundColor: "red",
     
        flexBasis: height * 0.5,
        display: "flex",
        gap: height * 0.2,
        position: "relative"
    },

    welcome_title:{
        color: "#fff",
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: width * 0.15,
        textAlign: "center",
        letterSpacing: 6
    },
    span_title:{
        color: rootColors.primarybtn
    },
    opacity_btn:{
        // backgroundColor: "red",
        // width: width * 0.65,
        position: "relative",
        alignSelf: "center"
    },
    btn:{
        textAlign: "center",
        backgroundColor: rootColors.primarybtn,
        borderWidth: 2,
        borderColor: rootColors.primarybtn,
        borderRadius: 50,
        paddingVertical: 15,
        width: width * 0.65,
        alignSelf: "center",
        fontFamily: "OpenSans",
        fontSize: width * 0.05,
        fontWeight: "700",
        letterSpacing: 2
        
    },

    /* Home Screen */
    opacity_refreshbtn:{
        // backgroundColor: "red",
        position: "absolute",
        right: 0,
        width: width * 0.4,
        height: height * 0.055,
        justifyContent: 'center',
        alignItems: 'center',
        // position: "relative",
        // paddingHorizontal: 20,
        marginTop: height * 0.05,
        // marginLeft: -width * 0.75,
    },
    btn3:{
       
        backgroundColor: rootColors.transparentWhite,
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingVertical: height * 0.01,
        borderRadius: width * 0.02,
        color: rootColors.black,
        
        
    },
    status_part:{
        // backgroundColor: "blue",
        width: width * 0.9,
        height: height * 0.47,
        marginTop: height * 0.05,
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        
        // gap: height * 0.00001
    },
    temp_title:{
        color: rootColors.white,
        fontSize: width * 0.3,
        fontWeight: "500",
        fontFamily: "OpenSans",
       
        // flexBasis: height * 0.3,
    },
    degree_span:{
        fontSize: width * 0.1
    },
    preci_status:{
        color: rootColors.white,
        fontSize: width * 0.06,
        fontWeight: "800"
    },
    max_min:{
        display: "flex",
        flexDirection: "row",
        gap: width * 0.05,
        
        
    },
    temp_max:{
        color: rootColors.white,
        fontSize: width * 0.04,
        fontWeight: "800"
        
    },
    temp_min:{
        color: rootColors.white,
        fontSize: width * 0.04,
        fontWeight: "800"
        
    },


    forecasts_part:{
        marginTop: -height * 0.2,
        backgroundColor: rootColors.transparentWhite,
        width: width * 0.95,
        height: height * 0.22,
        display: "flex",
        justifyContent: "space-between",
        gap: height * 0.03,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.04
    },
    forecasts_1:{
        
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    forecast_txt:{
        color: rootColors.white,
        fontSize: width * 0.045,
        fontWeight: "700"
    },

    forecasts_2:{
        
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    
  
       
    },
    w_box:{
        backgroundColor: rootColors.transparentblack,
        width: width * 0.20,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        marginHorizontal: 5, // Spacing between items
        alignItems: "center"
    },
    w_text:{
        color: rootColors.white,
        textAlign: "center"
    },
    w_icon:{
        width: width * 0.08,
        height: height * 0.05
    },

    tab_part:{
        backgroundColor: rootColors.transparentWhite,
        borderTopLeftRadius: width * 0.04,
        borderTopRightRadius: width * 0.04,
        width: width,
        // paddingVertical: height * 0.015,
        // paddingHorizontal: width * 0.05,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: width * 0.2,
        position: "relative"
    },
    tab_btn:{
        // backgroundColor: rootColors.primarybg,
        paddingVertical: height * 0.025,
        width: width * 0.35,
        height: height * 0.08,
        textAlign: "center",
        borderRadius: width * 0.04,
        color: rootColors.white,
        

    },
    opacity_btn2:{
        // backgroundColor: "red",
        width: width * 0.16,
        height: height * 0.08,
        marginTop: -height * 0.08,
        position: "relative",

    },
    tab_btn2:{
         backgroundColor: rootColors.primarybtn,
         
         paddingTop: height * 0.025,
         width: "100%",
         height: "100%",
         textAlign: "center",
         borderRadius: width * 0.5,
        //  color: rootColors.white
    },
    tab_icon:{
       
    },

    /* Location Screen */
    opacity_backbtn:{
        // backgroundColor: "red",
        width: width * 0.15,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        // position: "relative",
        // paddingHorizontal: 20,
        marginTop: height * 0.05,
        marginLeft: -width * 0.75,
    },
    back_btn:{
       
        backgroundColor: rootColors.transparentWhite,
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingVertical: height * 0.01,
        borderRadius: width * 0.02,
        color: rootColors.white,
        
    },
    city_part:{
        // backgroundColor: "red",
        width: width * 0.9,
        height: height * 0.15,
    },
    city_name:{
        color: rootColors.white,
        textAlign: "center",
        fontSize: width * 0.09,
        fontWeight: "500",
        letterSpacing: 5
    },
    city_input:{
        borderWidth: 2,
        borderColor: rootColors.white,
        borderRadius: width * 0.02,
        width: width * 0.9,
        height: height * 0.06,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: rootColors.transparentWhite,
        fontSize: width * 0.045,
        color: rootColors.white
    },
    input_error:{
        borderWidth: 2,
        borderColor: rootColors.red,
        borderRadius: width * 0.02,
        width: width * 0.9,
        height: height * 0.06,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: rootColors.transparentWhite,
        fontSize: width * 0.045,
        color: rootColors.white
    },
    error_txt:{
        position: "absolute",
        top: height * 0.07,
        left: width * 0.02,
        // color: rootColors.black,
        fontSize: width * 0.043,
        fontWeight: "800"
    },

    /* Explore Screen */
    forecast_city:{
       
        width: width * 0.9,
        marginTop: -height * 0.2,

    
    },
    city_name_explore:{
        color: rootColors.white,
        textAlign: "center",
        fontSize: width * 0.1,
        fontWeight: "500",
        letterSpacing: 5
    },
    temp_part:{
        
        width: "60%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
        
    },

    days_forecast:{
        
        width: width * 0.9,
        marginTop: -height * 0.15,
        // padding: width * 0.03
    },
    title_1:{
        color: rootColors.white,
        fontSize: width * 0.05,
        fontWeight: "800"
    },
    forecast_container:{
     
        backgroundColor: rootColors.transparentWhite,
        marginTop: height * 0.02,
        padding: width * 0.03,
        borderRadius: width * 0.04,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    day_box:{
        backgroundColor: rootColors.transparentblack,
        width: width * 0.35,
        borderRadius: width * 0.02,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5
    },

    air_forecast:{
        backgroundColor: rootColors.transparentWhite,
        width: width * 0.9,
        height: height * 0.13,
        marginTop: -height * 0.15,
        padding: width * 0.03,
        borderRadius: width * 0.04,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    title_2:{
        color: rootColors.white,
        fontSize: width * 0.025
    },
    status_txt:{
        color: rootColors.white,
        fontSize: width * 0.08,
        fontWeight: "700"
    },
    status_smalltxt:{
        color: rootColors.white
    },
    sun_forecast:{
        // backgroundColor: "red",
        width: width * 0.9,
        marginTop: -height * 0.15,
        marginBottom: height * 0.1,
        display: "flex",
        flexDirection: "row",
        
        justifyContent: "space-between"
    },
    sun_box:{
        backgroundColor: rootColors.transparentWhite,
        padding: width * 0.03,
        borderRadius: width * 0.04,
        width: width * 0.4,
        display: "flex",
        justifyContent: "space-between"
    },
    
    /* Setting Screen */
    setting_container:{
        // backgroundColor: "red",
        width: width * 0.9,
        height: height * 0.85,
        marginBottom: height * 0.02,
        position: "relative",
        gap: 20
    },
    setting_box:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        
        
        
    },

    setting_box2:{
        paddingRight: 20
    },

    setting_txt:{
        color: rootColors.white,
        fontSize: width * 0.07
    },
    v_text:{
        color: rootColors.white,
        fontSize: width * 0.045
    },
    coder_part:{
        backgroundColor: rootColors.transparentblack,
        width: width,
        height: height * 0.05,
        marginTop: -height * 0.1,
        marginBottom: height * 0
    },
    coder_txt:{
        paddingTop: "1.5%",
        color: rootColors.white,
        textAlign: "center",
        fontSize: width * 0.04,
        
    },
    link:{
        color: rootColors.primarybtn,
        fontWeight: "800"
    },
    
    /* About Screen */
    about_container:{
        
        width: width * 0.9,
        height: height * 0.85,
        marginBottom: height * 0.02,
        gap: 15
    },
    about_title:{
        color: rootColors.white,
        fontSize: width * 0.08,
        fontWeight: "800",
        letterSpacing: 4,
        textAlign: "center"
    },
    about_info:{
        color: rootColors.white,
        fontSize: width * 0.045,
        lineHeight: height * 0.035
    },
    
})



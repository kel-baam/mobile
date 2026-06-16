
import { LineChart } from "react-native-chart-kit";
import { Text, View,StyleSheet,Dimensions } from "react-native";


export const Chart = ({data,mode}:any) => {
const screenWidth  = data.length * 50 || Dimensions.get("window").width
  return (
    
  <View style={styles.container }>
    <Text style={styles.title}>
        {mode === "single" ? "Today Temperatures" : "Weekly Temperatures"}
     </Text>
    <LineChart
    data={{
      labels:
       mode === "single" ? data.map((item:any) => item.time.split("T")[1]):data.map((item:any) => item.time),
      datasets:
            mode === "single"
              ? [
                  {
                    data: data.map((item:any) => item.temperature),
                    color: (o = 1) => `rgba(0,255,0,${o})`,
                    strokeWidth: 2,
                  },
                ]
              : [
                  {
                    data: data.map(
                      (item:any) => item.temperature_2m_max
                    ),
                    color: (o = 1) =>
                      `rgba(255, 99, 132, ${o})`,
                    strokeWidth: 2,
                  },
                  {
                    data: data.map(
                      (item:any) => item.temperature_2m_min
                    ),
                    color: (o = 1) =>
                      `rgba(54, 162, 235, ${o})`,
                    strokeWidth: 2,
                  },
                ],
    }}
    width={screenWidth} 

    height={220}
    yAxisLabel=""
    yAxisSuffix="°C"
    yAxisInterval={1} 
    chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#1e2923",
            backgroundGradientTo: "#08130d",
            backgroundGradientFromOpacity: 0.7,  // ← opacity
            backgroundGradientToOpacity: 0.5,   
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "1",
                strokeWidth: "3",
                stroke: "#fff",
              },
        }}
    >
    </LineChart>
        {mode !== "single" &&(
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "rgba(255,99,132,1)" }]} />
            <Text style={styles.legendText}>Max Temp</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "rgba(54,162,235,1)" }]} />
            <Text style={styles.legendText}>Min Temp</Text>
          </View>
        </View>
      )}
  </View>)

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:8,
    backgroundColor: "rgba(30, 41, 35, 0.7)",

  },
   title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
  },
  legend: {
    
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: "white",
    fontSize: 13,
  },
 
 
})


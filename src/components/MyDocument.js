import React from 'react';
import { Page, Text, Font, View, Document, StyleSheet } from '@react-pdf/renderer'

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#E4E4E4'
    },
    titleSection: {
        marginTop: 10,
        backgroundColor: 'grey'
    },
    travelSection: {
        marginTop: 10,
        backgroundColor: 'turquoise'
    },
    foodSection: {
        marginTop: 10,
        backgroundColor: 'gray'
    },
    shoppingSection: {
        marginTop: 10,
        backgroundColor: 'turquoise'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    subtitle: {
        fontSize: 16,
        margin: 12,
        fontFamily: 'Oswald',
        fontWeight: "bold"
    },
    valuetitle: {
        fontSize: 12,
        margin: 10,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

// Create Document Component
const MyDocument = props => (
    <Document>
        <Page style={styles.body}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>{`Budget Planner ${props.values.destination}`}</Text>
            </View>
            <View style={styles.travelSection}>
                <Text style={styles.subtitle}>
                    Travel Information
                </Text>
                <Text style={styles.valuetitle}>
                    {`Destination: ${props.values.destination}`}
                </Text>
                <Text style={styles.valuetitle}>
                    {`Budget: $${props.values.budget}`}
                </Text>
            </View>
            <View style={styles.foodSection}>
                <Text style={styles.subtitle}>
                    Food
                </Text>
                <Text style={styles.valuetitle}>
                    {`Meal: ${props.values.meal}`}
                </Text>
                <Text style={styles.valuetitle}>
                    {`Price: $${props.values.mealPrice}`}
                </Text>
            </View>
            <View style={styles.shoppingSection}>
                <Text style={styles.subtitle}>
                    Shopping
                </Text>
                <Text style={styles.valuetitle}>
                    {`Shopping: ${props.values.shopping}`}
                </Text>
                <Text style={styles.valuetitle}>
                    {`Price: $${props.values.shoppingPrice}`}
                </Text>
            </View>
            <View style={styles.titleSection}>
                <Text style={styles.subtitle} break>
                    {`Total: $${parseInt(props.values.budget) +
                        parseInt(props.values.mealPrice) +
                        parseInt(props.values.shoppingPrice)}`}
                </Text>
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);

export default MyDocument;

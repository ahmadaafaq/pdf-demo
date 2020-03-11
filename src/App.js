import React from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import MyDocument from './components/MyDocument'

const styles = StyleSheet.create({
  viewer: {
    height: '100vh',
    width: '100vw'
  }
})

const App = () => (
  <PDFViewer style={styles.viewer}>
    <MyDocument />
  </PDFViewer>
)

export default App;


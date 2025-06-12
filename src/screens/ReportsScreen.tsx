import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const reportCards = [
  {
    title: 'Rapport journalier',
    description: 'Ventes et revenus du jour',
    icon: 'today',
    color: '#4ECDC4'
  },
  {
    title: 'Rapport hebdomadaire',
    description: 'Performance de la semaine',
    icon: 'date-range',
    color: '#FFD166'
  },
  {
    title: 'Rapport mensuel',
    description: 'Bilan complet du mois',
    icon: 'calendar-today',
    color: '#FF6B6B'
  },
  {
    title: 'Top produits',
    description: 'Articles les plus vendus',
    icon: 'star',
    color: '#A78BFA'
  },
  {
    title: 'Statistiques clients',
    description: 'Fidélisation et fréquentation',
    icon: 'people',
    color: '#06D6A0'
  },
  {
    title: 'Analyse des stocks',
    description: 'Mouvements et rotation',
    icon: 'assessment',
    color: '#F472B6'
  },
];

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Rapports et statistiques</Text>
      
      <View style={styles.cardsContainer}>
        {reportCards.map((report, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: report.color }]}>
            <View style={styles.cardIcon}>
              <MaterialIcons name={report.icon} size={28} color="white" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{report.title}</Text>
              <Text style={styles.cardDescription}>{report.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.exportSection}>
        <Text style={styles.sectionTitle}>Exporter des données</Text>
        <TouchableOpacity style={styles.exportButton}>
          <MaterialIcons name="file-download" size={24} color="#1E3A8A" />
          <Text style={styles.exportButtonText}>Exporter en PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
          <MaterialIcons name="insert-drive-file" size={24} color="#1E3A8A" />
          <Text style={styles.exportButtonText}>Exporter en Excel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  exportSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  exportButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: '600',
  },
});
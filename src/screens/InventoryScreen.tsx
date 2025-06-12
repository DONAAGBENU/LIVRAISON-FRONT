import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  ImageBackground,
  Modal,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  alert: boolean;
  image: string;
}

const initialItems: InventoryItem[] = [
  { 
    id: '1', 
    name: 'Poulet', 
    quantity: 15, 
    unit: 'kg', 
    alert: false,
    image: 'https://images.unsplash.com/photo-1589610921115-a0a1a07b0a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '2', 
    name: 'Poisson', 
    quantity: 8, 
    unit: 'kg', 
    alert: true,
    image: 'https://images.unsplash.com/photo-1518541694861-4e5f4b9279f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '3', 
    name: 'Plantain', 
    quantity: 20, 
    unit: 'régime', 
    alert: false,
    image: 'https://images.unsplash.com/photo-1593462386169-3d8a9e7b0e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'alert'> & { id?: string }>({ 
    name: '', 
    quantity: 0, 
    unit: 'kg', 
    image: 'https://via.placeholder.com/150' 
  });

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    setNewItem({ 
      name: '', 
      quantity: 0, 
      unit: 'kg', 
      image: 'https://via.placeholder.com/150' 
    });
    setAddModalVisible(true);
  };

  const confirmAddItem = () => {
    if (!newItem.name || newItem.quantity <= 0) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs correctement');
      return;
    }

    const newId = (items.length + 1).toString();
    const alert = newItem.quantity < 5;
    
    setItems([...items, {
      ...newItem,
      id: newId,
      alert
    }]);

    setAddModalVisible(false);
    Alert.alert('Succès', 'Article ajouté avec succès');
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const confirmEditItem = () => {
    if (!selectedItem) return;

    const updatedItems = items.map(item => 
      item.id === selectedItem.id ? { 
        ...selectedItem, 
        alert: selectedItem.quantity < 5
      } : item
    );

    setItems(updatedItems);
    setModalVisible(false);
    Alert.alert('Succès', 'Article modifié avec succès');
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cet article?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          onPress: () => {
            setItems(items.filter(item => item.id !== id));
            Alert.alert('Succès', 'Article supprimé avec succès');
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <View style={[styles.itemCard, item.alert && styles.alertCard]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>
          {item.quantity} {item.unit}
        </Text>
      </View>
      
      {item.alert && (
        <View style={styles.alertBadge}>
          <MaterialIcons name="warning" size={18} color="white" />
          <Text style={styles.alertText}>Stock faible</Text>
        </View>
      )}
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleEditItem(item)}
        >
          <MaterialIcons name="edit" size={20} color="#1E3A8A" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleDeleteItem(item.id)}
        >
          <MaterialIcons name="delete" size={20} color="#FF4757" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
      style={styles.backgroundImage}
      blurRadius={1}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Gestion des stocks</Text>
        
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>

        {/* Modal pour modifier */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedItem && (
                <ScrollView>
                  <Text style={styles.modalTitle}>Modifier {selectedItem.name}</Text>
                  
                  <Image 
                    source={{ uri: selectedItem.image }} 
                    style={styles.modalImage} 
                  />
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Nom du produit"
                    value={selectedItem.name}
                    onChangeText={(text) => setSelectedItem({...selectedItem, name: text})}
                  />
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Quantité"
                    value={selectedItem.quantity.toString()}
                    onChangeText={(text) => setSelectedItem({...selectedItem, quantity: Number(text) || 0})}
                    keyboardType="numeric"
                  />
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Unité (kg, L, etc.)"
                    value={selectedItem.unit}
                    onChangeText={(text) => setSelectedItem({...selectedItem, unit: text})}
                  />
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="URL de l'image"
                    value={selectedItem.image}
                    onChangeText={(text) => setSelectedItem({...selectedItem, image: text})}
                  />
                  
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.cancelButtonText}>Annuler</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.modalButton, styles.confirmButton]}
                      onPress={confirmEditItem}
                    >
                      <Text style={styles.buttonText}>Enregistrer</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        {/* Modal pour ajouter */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => setAddModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView>
                <Text style={styles.modalTitle}>Ajouter un nouveau produit</Text>
                
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nom du produit"
                  value={newItem.name}
                  onChangeText={(text) => setNewItem({...newItem, name: text})}
                />
                
                <TextInput
                  style={styles.modalInput}
                  placeholder="Quantité"
                  value={newItem.quantity.toString()}
                  onChangeText={(text) => setNewItem({...newItem, quantity: Number(text) || 0})}
                  keyboardType="numeric"
                />
                
                <TextInput
                  style={styles.modalInput}
                  placeholder="Unité (kg, L, etc.)"
                  value={newItem.unit}
                  onChangeText={(text) => setNewItem({...newItem, unit: text})}
                />
                
                <TextInput
                  style={styles.modalInput}
                  placeholder="URL de l'image"
                  value={newItem.image}
                  onChangeText={(text) => setNewItem({...newItem, image: text})}
                />
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setAddModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={confirmAddItem}
                  >
                    <Text style={styles.buttonText}>Ajouter</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(248, 250, 252, 0.85)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#1E293B',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  alertCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF4757',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#64748B',
  },
  alertBadge: {
    flexDirection: 'row',
    backgroundColor: '#FF4757',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  alertText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1E3A8A',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
  },
  confirmButton: {
    backgroundColor: '#1E3A8A',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#1E293B',
    fontWeight: 'bold',
  },
});
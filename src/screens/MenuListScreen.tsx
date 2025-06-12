import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ImageBackground,
  Image,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native'; // AJOUT: Import de RouteProp
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types'; // AJOUT: Assurez-vous que ce fichier existe

// AJOUT: Typage des props
interface MenuListProps {
  route: RouteProp<RootStackParamList, 'MenuList'>;
  navigation: any;
}

const { width } = Dimensions.get('window');

const menuItems = [
  {
    id: '1',
    title: 'Riz blanc',
    price: '2500 FCFA',
    description: 'Un riz blanc parfumé préparé à la vapeur, accompagné de votre choix de viande ou poisson frais. Cuisson parfaite pour des grains séparés et moelleux.',
    composition: [
      'Riz basmati de qualité premium',
      'Viande de boeuf tendre ou poulet fermier',
      'Oignons, carottes et poivrons frais',
      'Épices sélectionnées (poivre, thym, laurier)',
      'Bouillon maison préparé avec des os à moelle'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  // ... (TOUS vos autres éléments du menu restent inchangés)
  {
    id: '2',
    title: 'Riz cantonais',
    price: '2000 FCFA',
    description: 'Notre version africaine du riz cantonais, riche en saveurs avec des légumes croquants. Un mélange parfait entre tradition et innovation culinaire.',
    composition: [
      'Riz parfumé de qualité supérieure',
      'Dés de jambon de poulet maison et crevettes fraîches',
      'Petits pois, carottes, oignons coupés finement',
      'Oeuf brouillé en filaments',
      'Sauce soja légère et huile de sésame'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'Riz au gras',
    price: '2200 FCFA',
    description: 'Un riz riche et savoureux cuit dans un bouillon parfumé avec des morceaux de viande fondants. La touche d\'huile de palme lui donne sa couleur caractéristique.',
    composition: [
      'Riz grain long importé',
      'Viande de mouton marinée ou poulet fermier',
      'Tomates fraîches, oignons, ail et gingembre',
      'Piment doux et piment oiseau (optionnel)',
      'Huile de palme rouge naturelle pressée à froid'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    title: 'Atchèkè',
    price: '1000 FCFA',
    description: 'Semoule de manioc traditionnelle accompagnée de sauce graine ou de poisson braisé. Plat emblématique de la cuisine ivoirienne.',
    composition: [
      'Atchèké frais préparé artisanalement',
      'Poisson braisé (capitaine ou tilapia)',
      'Sauce graine maison ou sauce tomate fraîche',
      'Oignons crus et piments frais',
      'Huile de palme (optionnelle)'
    ],
    available: true,
    immediate: true,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    title: 'Pâte + Gombo',
    price: '1000 FCFA',
    description: 'Pâte de maïs ou d\'igname accompagnée d\'une sauce gombo onctueuse. Plat réconfortant par excellence.',
    composition: [
      'Pâte fraîche préparée quotidiennement',
      'Sauce gombo avec filets de poisson ou viande',
      'Huile rouge de qualité',
      'Écrasas de tomate fraîche',
      'Assaisonnement complet (sel, cube, poivre)'
    ],
    available: true,
    immediate: true,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    title: 'Jus d\'orange',
    price: '500 FCFA',
    description: 'Jus d\'orange 100% naturel pressé à la commande, riche en vitamine C. Rafraîchissement garanti.',
    composition: [
      'Oranges fraîches sélectionnées',
      'Glaçons (sur demande)',
      'Sucre naturel (optionnel)'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '7',
    title: 'Jus de mangue',
    price: '500 FCFA',
    description: 'Jus de mangue fraîche, onctueux et sucré naturellement. Un délice tropical.',
    composition: [
      'Mangues mûres à point',
      'Eau filtrée',
      'Glaçons (sur demande)'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '8',
    title: 'Cocktail Pastèque/Ananas',
    price: '800 FCFA',
    description: 'Mélange rafraîchissant de pastèque juteuse et d\'ananas acidulé. Idéal pour les journées chaudes.',
    composition: [
      'Pastèque fraîche sans pépins',
      'Ananas mûr à point',
      'Feuilles de menthe fraîche',
      'Glaçons pilés'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '9',
    title: 'Cocktail Spécial (4 fruits)',
    price: '800 FCFA',
    description: 'Notre cocktail signature mélangeant 4 fruits tropicaux pour une explosion de saveurs.',
    composition: [
      'Ananas frais',
      'Mangue mûre',
      'Fruit de la passion (4 côtés)',
      'Orange sanguine',
      'Feuilles de menthe'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '10',
    title: 'Cocktail Banane/Mangue/Orange',
    price: '800 FCFA',
    description: 'Mélange crémeux et vitaminé parfait pour le petit déjeuner ou comme encas énergétique.',
    composition: [
      'Bananes bien mûres',
      'Mangue locale',
      'Jus d\'orange frais',
      'Yaourt nature (optionnel)',
      'Miel local (optionnel)'
    ],
    available: true,
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  }
];

const MenuList = ({ route, navigation }: MenuListProps) => { // AJOUT: Typage des props
  // AJOUT: Récupération des paramètres de commande
  const orderDetails = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.item, item.immediate && styles.immediateItem]}
      onPress={() => navigation.navigate('MenuDetail', { 
        item,
        orderDetails // AJOUT: Passage des paramètres de commande
      })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {item.immediate && <Text style={styles.immediateBadge}>Disponible immédiatement</Text>}
        </View>
        <Text style={styles.price}>{item.price}</Text>
        {!item.available && <Text style={styles.unavailable}>Temporairement indisponible</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('MealOrder')} // AJOUT: Retour vers MealOrder
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>Nos Spécialités</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.subHeader}>Plats disponibles aujourd'hui</Text>
          
          <Text style={styles.sectionTitle}>Plats principaux</Text>
          <FlatList
            data={menuItems.filter(item => ['1','2','3','4','5'].includes(item.id))}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
          
          <Text style={styles.sectionTitle}>Jus naturels</Text>
          <FlatList
            data={menuItems.filter(item => ['6','7','8','9','10'].includes(item.id))}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

// TOUS vos styles restent EXACTEMENT les mêmes
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
    paddingLeft: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listContent: {
    paddingBottom: 30,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    overflow: 'hidden',
    height: 120,
  },
  immediateItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  itemImage: {
    width: 120,
    height: '100%',
  },
  itemContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#2C3E50',
  },
  price: {
    fontSize: 16,
    color: '#E67E22',
    fontWeight: '600',
    marginTop: 5,
  },
  immediateBadge: {
    fontSize: 12,
    backgroundColor: '#27AE60',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 10,
  },
  unavailable: {
    fontSize: 12,
    color: '#E74C3C',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default MenuList;
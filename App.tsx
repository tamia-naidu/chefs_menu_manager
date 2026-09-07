import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('menu');

  return (
  <View style={styles.container}>

    {screen === 'menu' ? (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Restaurant Menu</Text>
          <Text style={styles.subtitle}>Manage your menu items</Text>
        </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setScreen('add')}
>
          <Text style={styles.addButtonText}>+ Add Menu Item</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Current Menu</Text>

        <View style={styles.menuCard}>
          <View>
            <Text style={styles.dishName}>Smoked Chicken Pasta</Text>
            <Text style={styles.description}>
              Grilled smoked chicken with Penne pasta, cooked in a creamy sauce with basil
            </Text>
            <Text style={styles.course}>MAIN COURSE</Text>
          </View>

          <Text style={styles.price}>R150.00</Text>
        </View>

        <View style={styles.menuCard}>
          <View>
            <Text style={styles.dishName}>Classic Garden Salad</Text>
            <Text style={styles.description}>
              Mixed greens with tomatoes, cucumbers, carrots, red onions, and croutons
            </Text>
            <Text style={styles.course}>STARTER</Text>
          </View>

          <Text style={styles.price}>R70.00</Text>
        </View>

        <View style={styles.menuCard}>
          <View>
            <Text style={styles.dishName}>Chocolate Cake</Text>
            <Text style={styles.description}>
              A rich slice of a moist chocolate cake, drizzled with chocolcate ganache
            </Text>
            <Text style={styles.course}>DESSERT</Text>
          </View>

          <Text style={styles.price}>R55.00</Text>
        </View>
      </View>

      </>
    ) : (
      <View style={styles.content}>

        <Text style={styles.formTitle}>Add Menu Item</Text>

        <Text style={styles.label}>Dish Name</Text>
        <View style={styles.input}>
          <Text style={styles.placeholder}>Enter dish name</Text>
        </View>

        <Text style={styles.label}>Description</Text>
        <View style={styles.descriptionInput}>
          <Text style={styles.placeholder}>Enter description</Text>
        </View>

        <Text style={styles.label}>Course</Text>
        <View style={styles.input}>
          <Text style={styles.placeholder}>Select course</Text>
        </View>

        <Text style={styles.label}>Price</Text>
        <View style={styles.input}>
          <Text style={styles.placeholder}>Enter price</Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Menu Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setScreen('menu')}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    )}

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },

  header: {
    backgroundColor: '#7A263A',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 24,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#F7E9E2',
    fontSize: 14,
    marginTop: 5,
  },

  content: {
    padding: 24,
  },

  addButton: {
    backgroundColor: '#C96A4A',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  sectionTitle: {
    color: '#2B2B2B',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 28,
    marginBottom: 15,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5D8CC',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dishName: {
    color: '#2B2B2B',
    fontSize: 17,
    fontWeight: '600',
  },

  description: {
    color: '#6B6B6B',
    fontSize: 12,
    marginTop: 5,
    maxWidth: 220,
  },

  course: {
    color: '#7A263A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 8,
  },

  price: {
    color: '#C96A4A',
    fontSize: 16,
    fontWeight: 'bold',
  },

  formTitle: {
  color: '#2B2B2B',
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 25,
},

label: {
  color: '#2B2B2B',
  fontSize: 14,
  fontWeight: '600',
  marginBottom: 8,
  marginTop: 12,
},

input: {
  backgroundColor: '#FFFFFF',
  height: 52,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#E5D8CC',
  justifyContent: 'center',
  paddingHorizontal: 15,
},

descriptionInput: {
  backgroundColor: '#FFFFFF',
  height: 100,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#E5D8CC',
  paddingHorizontal: 15,
  paddingTop: 15,
},

placeholder: {
  color: '#6B6B6B',
  fontSize: 14,
},

saveButton: {
  backgroundColor: '#7A263A',
  height: 52,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
},

saveButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},

cancelButton: {
  height: 52,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#7A263A',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 12,
},

cancelButtonText: {
  color: '#7A263A',
  fontSize: 16,
  fontWeight: '600',
},

});
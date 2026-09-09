import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<MenuItem | null>(null);

  const handleSave = () => {
  if (!dishName.trim()) {
    setErrorMessage('Please enter a dish name.');
    return;
  }

  if (!description.trim()) {
    setErrorMessage('Please enter a description.');
    return;
  }

  if (!course) {
    setErrorMessage('Please select a course.');
    return;
  }

  if (!price.trim()) {
    setErrorMessage('Please enter a price.');
    return;
  }

  const newItem: MenuItem = {
    id: Date.now().toString(),
    dishName: dishName.trim(),
    description: description.trim(),
    course: course,
    price: price.trim(),
  };

  setMenuItems(currentItems => [...currentItems, newItem]);
  setLastAddedItem(newItem);
  setErrorMessage('');
  setScreen('success');
};

  return (
  <View style={styles.container}>

      {screen === 'menu' ? (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Restaurant Menu</Text>
          <Text style={styles.subtitle}>Manage your menu items</Text>
        </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.menuContent}
          >
          
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
      </ScrollView>

        <Text style={styles.addedSectionTitle}>Added Menu Items</Text>

{menuItems.length === 0 ? (
  <Text style={styles.emptyMessage}>
    No new menu items have been added yet.
  </Text>
) : (
  menuItems.map((item) => (
    <View style={styles.menuCard} key={item.id}>
      <View>
        <Text style={styles.dishName}>{item.dishName}</Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.course}>
          {item.course.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.price}>
        R{item.price}
      </Text>
    </View>
  ))
)}

      </>
    ) : screen === 'add' ? (
      <View style={styles.content}>

        <Text style={styles.formTitle}>Add Menu Item</Text>

        {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          placeholderTextColor="#6B6B6B"
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Enter description"
          placeholderTextColor="#6B6B6B"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Course</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={course}
            onValueChange={(itemValue) => {
              setCourse(itemValue);
              setErrorMessage('');
          }}
      >
            <Picker.Item label="Select course" value="" />
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          placeholderTextColor="#6B6B6B"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />  

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >

          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setScreen('menu')}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    ) : (
  <View style={styles.content}>
    <Text style={styles.successTitle}>✓</Text>

    <Text style={styles.successHeading}>
      Menu Item Added!
    </Text>

    <Text style={styles.successMessage}>
      Menu item added successfully!
    </Text>

    {lastAddedItem && (
      <View style={styles.menuCard}>
        <View>
          <Text style={styles.dishName}>
            {lastAddedItem.dishName}
          </Text>

          <Text style={styles.description}>
            {lastAddedItem.description}
          </Text>

          <Text style={styles.course}>
            {lastAddedItem.course.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.price}>
          R{lastAddedItem.price}
        </Text>
      </View>
    )}

    <TouchableOpacity
      style={styles.saveButton}
      onPress={() => setScreen('menu')}
    >
      <Text style={styles.saveButtonText}>
        Back to Menu
      </Text>
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

  menuContent: {
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

  errorMessage: {
    color: '#C94C4C',
    fontSize: 14,
    marginBottom: 15,
    fontWeight: '500',
},

  successTitle: {
    fontSize: 48,
    color: '#3A8D5D',
    textAlign: 'center',
    marginTop: 40,
},

  successHeading: {
    color: '#2B2B2B',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
},

  successMessage: {
    color: '#3A8D5D',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
},

  emptyMessage: {
    color: '#6B6B6B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
},

  addedSectionTitle: {
    color: '#2B2B2B',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 15,
},

});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker'; //To use the Picker component for selecting the course type

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    dishName: 'Smoked Chicken Pasta',
    description:
      'Grilled smoked chicken with Penne pasta, cooked in a creamy sauce with basil',
    course: 'Main Course',
    price: '150.00',
  },
  {
    id: '2',
    dishName: 'Classic Garden Salad',
    description:
      'Mixed greens with tomatoes, cucumbers, carrots, red onions, and croutons',
    course: 'Starter',
    price: '70.00',
  },
  {
    id: '3',
    dishName: 'Chocolate Cake',
    description:
      'A rich slice of a moist chocolate cake, drizzled with chocolate ganache',
    course: 'Dessert',
    price: '55.00',
  },
];

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [lastAddedItem, setLastAddedItem] = useState<MenuItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Calculates the total number of menu items.
const totalItems = menuItems.length;

// Counts the number of starters.
const starterCount = menuItems.filter(
  item => item.course === 'Starter'
).length;

// Counts the number of main courses.
const mainCourseCount = menuItems.filter(
  item => item.course === 'Main Course'
).length;

// Counts the number of desserts.
const dessertCount = menuItems.filter(
  item => item.course === 'Dessert'
).length;

// Calculates the average price for each course.
const calculateCourseAverage = (selectedCourse: string) => {
  const courseItems = menuItems.filter(
    item => item.course === selectedCourse
  );

  if (courseItems.length === 0) {
    return 0;
  }

  const totalPrice = courseItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return totalPrice / courseItems.length;
};

const starterAverage = calculateCourseAverage('Starter');
const mainCourseAverage = calculateCourseAverage('Main Course');
const dessertAverage = calculateCourseAverage('Dessert');

  const averagePrice =
    menuItems.length === 0
      ? 0
      : menuItems.reduce((total, item) => total + Number(item.price), 0) /
        menuItems.length;

    // This will open the form and fill it with the selected menu item's details.
  const handleEditItem = (item: MenuItem) => {
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);

    setEditingItemId(item.id);
    setErrorMessage('');
    setScreen('add');
  };

  // Deletes a menu item after the user confirms.
  const handleDeleteItem = (itemId: string) => {
    Alert.alert(
      'Delete Menu Item',
      'Are you sure you want to delete this menu item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(currentItems =>
              currentItems.filter(item => item.id !== itemId)
            );
          },
        },
      ]
    );
  };

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

    if (Number.isNaN(Number(price))) {
      setErrorMessage('Please enter a valid price.');
      return;
    }

    const newItem: MenuItem = {
  id: editingItemId ?? Date.now().toString(),
  dishName: dishName.trim(),
  description: description.trim(),
  course: course,
  price: price.trim(),
};

    if (editingItemId !== null) {
      setMenuItems(currentItems =>
        currentItems.map(item =>
          item.id === editingItemId ? newItem : item
        )
      );
    } else {
      setMenuItems(currentItems => [...currentItems, newItem]);
    }

    setLastAddedItem(newItem);
    setEditingItemId(null);
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

            <Text style={styles.sectionTitle}>Menu Statistics</Text>

            <View style={styles.statisticsCard}>
              <Text style={styles.statisticLabel}>Total Menu Items</Text>
              <Text style={styles.statisticValue}>{totalItems}</Text>
            </View>

            <View style={styles.statisticsCard}>
              <Text style={styles.statisticLabel}>Average Price</Text>
              <Text style={styles.statisticValue}>R{averagePrice.toFixed(2)}</Text>
            </View>

            <Text style={styles.sectionTitle}>Average Price by Course</Text>

            <View style={styles.statisticsCard}>
              <Text style={styles.statisticLabel}>Starters ({starterCount})</Text>
              <Text style={styles.statisticValue}>R{starterAverage.toFixed(2)}</Text>
            </View>

            <View style={styles.statisticsCard}>
              <Text style={styles.statisticLabel}>Main Courses ({mainCourseCount})</Text>
              <Text style={styles.statisticValue}>R{mainCourseAverage.toFixed(2)}</Text>
            </View>

            <View style={styles.statisticsCard}>
              <Text style={styles.statisticLabel}>Desserts ({dessertCount})</Text>
              <Text style={styles.statisticValue}>R{dessertAverage.toFixed(2)}</Text>
            </View>

            <Text style={styles.sectionTitle}>Current Menu</Text>

            {menuItems.length === 0 ? (
              <Text style={styles.emptyMessage}>
                No menu items are currently available.
              </Text>
            ) : (
              menuItems.map((item) => (
                <View style={styles.menuCard} key={item.id}>
                  <View>
                    <Text style={styles.dishName}>{item.dishName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.course}>{item.course.toUpperCase()}</Text>
                  </View>

                  <Text style={styles.price}>R{Number(item.price).toFixed(2)}</Text>
                </View>
              ))
            )}
          </ScrollView>
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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

          <Text style={styles.successHeading}>Menu Item Added!</Text>

          <Text style={styles.successMessage}>Menu item added successfully!</Text>

          {lastAddedItem && (
            <View style={styles.menuCard}>
              <View>
                <Text style={styles.dishName}>{lastAddedItem.dishName}</Text>
                <Text style={styles.description}>{lastAddedItem.description}</Text>
                <Text style={styles.course}>{lastAddedItem.course.toUpperCase()}</Text>
              </View>

              <Text style={styles.price}>R{lastAddedItem.price}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setScreen('menu')}
          >
            <Text style={styles.saveButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

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

  statisticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5D8CC',
    padding: 16,
    marginBottom: 12,
  },

  statisticLabel: {
    color: '#6B6B6B',
    fontSize: 14,
  },

  statisticValue: {
    color: '#7A263A',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
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
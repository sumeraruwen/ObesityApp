import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [category, setCategory] = useState('General');
  const [userProfile, setUserProfile] = useState({ displayName: 'User' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let authUnsubscribe = () => {};
    let profileUnsubscribe = () => {};
    let postsUnsubscribe = () => {};
    const likesUnsubscribes = new Map();

    authUnsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        // Cleanup all listeners before navigating
        profileUnsubscribe();
        postsUnsubscribe();
        likesUnsubscribes.forEach(unsubscribe => unsubscribe());
        likesUnsubscribes.clear();
        navigation.navigate('Login');
        setLoading(false);
        setPosts([]); // Clear posts to avoid stale data
        return;
      }

      // Setup listeners only if user is authenticated
      profileUnsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(
          (doc) => {
            const profileData = doc.data()?.profile;
            setUserProfile(profileData || { displayName: user.email.split('@')[0] });
            console.log('Profile updated:', profileData);
          },
          (error) => console.error('Error fetching profile:', error)
        );

      postsUnsubscribe = firestore()
        .collection('community')
        .orderBy('timestamp', 'desc')
        .limit(50)
        .onSnapshot((snapshot) => {
          const fetchedPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            likes: 0,
            isLiked: false,
          }));

          fetchedPosts.forEach(post => {
            if (likesUnsubscribes.has(post.id)) return; // Skip if already listening
            const likesRef = firestore().collection('community').doc(post.id).collection('likes');
            likesUnsubscribes.set(
              post.id,
              likesRef.onSnapshot((likesSnapshot) => {
                const likesCount = likesSnapshot.size;
                const userLike = likesSnapshot.docs.some(doc => doc.id === user.uid);
                setPosts(prev =>
                  prev.map(p =>
                    p.id === post.id ? { ...p, likes: likesCount, isLiked: userLike } : p
                  )
                );
              }, (error) => console.error(`Error fetching likes for post ${post.id}:`, error))
            );
          });

          setPosts(fetchedPosts);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching posts:', error);
          Alert.alert('Error', 'Failed to load posts.');
          setLoading(false);
        });
    });

    return () => {
      authUnsubscribe();
      profileUnsubscribe();
      postsUnsubscribe();
      likesUnsubscribes.forEach(unsubscribe => unsubscribe());
      likesUnsubscribes.clear();
    };
  }, [navigation]);

  const addPost = async () => {
    const user = auth().currentUser;
    if (!user || !newPost.trim()) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }

    try {
      await firestore().collection('community').add({
        userId: user.uid,
        text: newPost.trim(),
        category,
        timestamp: firestore.FieldValue.serverTimestamp(),
        displayName: userProfile.displayName,
      });
      setNewPost('');
      setCategory('General');
      Alert.alert('Success', 'Your post has been shared!');
    } catch (error) {
      console.error('Error adding post:', error);
      Alert.alert('Error', 'Failed to share your post.');
    }
  };

  const toggleLike = async (postId, isLiked) => {
    const user = auth().currentUser;
    if (!user) return;

    const likeRef = firestore().collection('community').doc(postId).collection('likes').doc(user.uid);
    try {
      if (isLiked) {
        await likeRef.delete();
      } else {
        await likeRef.set({ timestamp: firestore.FieldValue.serverTimestamp() });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      Alert.alert('Error', 'Could not toggle like: ' + error.message);
    }
  };

  const deletePost = async (postId, postUserId) => {
    const user = auth().currentUser;
    if (!user || user.uid !== postUserId) {
      Alert.alert('Error', 'Only the post owner can delete this post.');
      return;
    }

    try {
      await firestore().collection('community').doc(postId).delete();
      Alert.alert('Success', 'Post deleted.');
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Could not delete post.');
    }
  };

  const renderPost = (post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Icon name="user-circle" size={24} color="#10B981" />
        <Text style={styles.postAuthor}>{post.displayName}</Text>
        <Text style={styles.postCategory}>[{post.category}]</Text>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => toggleLike(post.id, post.isLiked)}
        >
          <Icon name="heart" size={18} color={post.isLiked ? '#EF4444' : '#6B7280'} />
          <Text style={styles.likeCount}>{post.likes}</Text>
        </TouchableOpacity>
        {auth().currentUser?.uid === post.userId && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePost(post.id, post.userId)}
          >
            <Icon name="trash" size={18} color="#EF4444" />
          </TouchableOpacity>
        )}
        <Text style={styles.postTimestamp}>
          {post.timestamp?.toDate().toLocaleString() || 'Just now'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Community</Text>
        <Text style={styles.headerSubtitle}>Share and Connect</Text>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading posts...</Text>
      ) : (
        <>
          <ScrollView style={styles.postsContainer}>
            {posts.length === 0 ? (
              <Text style={styles.noPostsText}>No posts yet. Be the first to share!</Text>
            ) : (
              posts.map(post => renderPost(post))
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Share your thoughts..."
              placeholderTextColor="#6B7280"
              value={newPost}
              onChangeText={setNewPost}
              maxLength={200}
            />
            <Picker
              selectedValue={category}
              style={styles.categoryPicker}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="General" value="General" />
              <Picker.Item label="Success" value="Success" />
              <Picker.Item label="Question" value="Question" />
              <Picker.Item label="Tip" value="Tip" />
            </Picker>
            <TouchableOpacity style={styles.postButton} onPress={addPost}>
              <Icon name="paper-plane" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: {
    backgroundColor: '#10B981',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  headerText: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 16, color: '#D1FAE5', marginTop: 8 },
  postsContainer: { flex: 1, padding: 16 },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  postAuthor: { fontSize: 16, fontWeight: '600', color: '#111827', marginLeft: 8 },
  postCategory: { fontSize: 14, color: '#10B981', marginLeft: 8 },
  postText: { fontSize: 16, color: '#111827', marginBottom: 8 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  likeButton: { flexDirection: 'row', alignItems: 'center' },
  deleteButton: { marginLeft: 10 },
  likeCount: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  postTimestamp: { fontSize: 12, color: '#6B7280' },
  noPostsText: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 20 },
  inputContainer: {
    padding: 16,
    backgroundColor: '#F1F5F9',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  categoryPicker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  postButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
  },
  backButtonText: { fontSize: 16, fontWeight: '600', color: '#3B82F6' },
  loadingText: { fontSize: 18, color: '#111827', textAlign: 'center', marginTop: 20 },
});

export default CommunityScreen;
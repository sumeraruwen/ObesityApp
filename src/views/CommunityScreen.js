import React, { useState, useEffect, useRef } from 'react';
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
  const textInputRef = useRef(null);

  useEffect(() => {
    let authUnsubscribe = () => {};
    let profileUnsubscribe = () => {};
    let postsUnsubscribe = () => {};
    const likesUnsubscribes = new Map();

    authUnsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        profileUnsubscribe();
        postsUnsubscribe();
        likesUnsubscribes.forEach(unsubscribe => unsubscribe());
        likesUnsubscribes.clear();
        navigation.navigate('Login');
        setLoading(false);
        setPosts([]);
        return;
      }

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
            if (likesUnsubscribes.has(post.id)) return;
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
      
      // Clear input with state and ref, then log to confirm
      setNewPost(() => {
        console.log('New post state set to empty');
        textInputRef.current?.clear();
        return '';
      });
      setCategory('General');
      Alert.alert('Success', 'Your post has been shared!');
    } catch (error) {
      console.error('Error adding post:', error);
      Alert.alert('Error', 'Failed to share your post.');
      setNewPost(() => {
        console.log('New post state set to empty (error case)');
        textInputRef.current?.clear();
        return '';
      });
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
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(post.id, post.isLiked)}>
          <Icon name="heart" size={18} color={post.isLiked ? '#EF4444' : '#6B7280'} />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        {auth().currentUser?.uid === post.userId && (
          <TouchableOpacity style={styles.actionButton} onPress={() => deletePost(post.id, post.userId)}>
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
        <Text style={styles.headerText}>Community Hub</Text>
        <Text style={styles.headerSubtitle}>Connect, Share, Inspire</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.postsContainer} contentContainerStyle={{ paddingBottom: 20 }}>
            {posts.length === 0 ? (
              <Text style={styles.noPostsText}>No posts yet. Start the conversation!</Text>
            ) : (
              posts.map(post => renderPost(post))
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.input}
              placeholder="What’s on your mind?"
              placeholderTextColor="#9CA3AF"
              value={newPost}
              onChangeText={setNewPost}
              maxLength={200}
              multiline
            />
            <View style={styles.inputActions}>
              <Picker
                selectedValue={category}
                style={styles.categoryPicker}
                onValueChange={(itemValue) => setCategory(itemValue)}
                dropdownIconColor="#6B7280"
              >
                <Picker.Item label="General" value="General" color="#FFFFFF" />
                <Picker.Item label="Success" value="Success" color="#FFFFFF" />
                <Picker.Item label="Question" value="Question" color="#FFFFFF" />
                <Picker.Item label="Tip" value="Tip" color="#FFFFFF" />
              </Picker>
              <TouchableOpacity style={styles.postButton} onPress={addPost}>
                <Icon name="paper-plane" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
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
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#10B981',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1FAE5',
    marginTop: 6,
    fontWeight: '500',
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 10,
  },
  postCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 8,
  },
  postText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  noPostsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '500',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#E5E7EB',
    borderTopWidth: 1,
    borderColor: '#D1D5DB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryPicker: {
    flex: 1,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 8,
    color: '#111827',
  },
  postButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 12,
    marginLeft: 12,
    elevation: 2,
  },
  backButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3B82F6',
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '500',
  },
});

export default CommunityScreen;
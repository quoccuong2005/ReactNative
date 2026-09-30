import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const courses = [
  { id: '1', name: 'Lập trình di động', lessons: 12, progress: 72, icon: '📱', color: '#E4F3EF', accent: '#278A72' },
  { id: '2', name: 'Cơ sở dữ liệu', lessons: 10, progress: 48, icon: '🗄️', color: '#FFF0E2', accent: '#D47B35' },
  { id: '3', name: 'Thiết kế giao diện', lessons: 8, progress: 100, icon: '🎨', color: '#EAEAFF', accent: '#6C68C5' },
  { id: '4', name: 'Cấu trúc dữ liệu', lessons: 14, progress: 25, icon: '🧩', color: '#FCE9EC', accent: '#CA6373' },
];

const stats = [
  { icon: '▤', value: '08', label: 'Môn học', color: '#287C6A', tint: '#E4F3EF' },
  { icon: '✓', value: '12', label: 'Bài tập', color: '#C77632', tint: '#FFF0E2' },
  { icon: '★', value: '03', label: 'Hoàn thành', color: '#6562B5', tint: '#EAEAFF' },
];

const tabs = [
  { label: 'Trang chủ', icon: '⌂' },
  { label: 'Môn học', icon: '▤' },
  { label: 'Bài tập', icon: '✓' },
  { label: 'Cá nhân', icon: '●' },
];

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8F7" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const filteredCourses = courses.filter(course =>
    course.name.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')),
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>CHÀO BUỔI SÁNG</Text>
            <Text style={styles.studentName}>Nguyễn Quốc Cường 👋</Text>
            <Text style={styles.subtitle}>Sẵn sàng cho ngày học mới?</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.notificationButton} accessibilityLabel="Thông báo">
              <Text style={styles.bell}>🔔</Text>
              <View style={styles.notificationDot} />
            </Pressable>
            <Image
              source={{ uri: 'https://i.pravatar.cc/120?img=47' }}
              style={styles.avatar}
              accessibilityLabel="Ảnh đại diện Nguyễn Quốc Cường"
            />
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.tint }]}>
                <Text style={[styles.statIconText, { color: stat.color }]}>{stat.icon}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Khóa học của bạn</Text>
            <Text style={styles.sectionSubtitle}>Tiếp tục hành trình học tập</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Xem tất cả môn học">
            <Text style={styles.seeAll}>Tất cả  ↗</Text>
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm kiếm môn học..."
            placeholderTextColor="#98A5A2"
            style={styles.searchInput}
            returnKeyType="search"
            accessibilityLabel="Tìm kiếm môn học"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} accessibilityLabel="Xóa nội dung tìm kiếm">
              <Text style={styles.clearSearch}>×</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.courseList}>
          {filteredCourses.map(course => {
            const isComplete = course.progress === 100;
            const isSelected = selectedCourse === course.id;
            return (
              <Pressable
                key={course.id}
                onPress={() => setSelectedCourse(isSelected ? null : course.id)}
                style={[styles.courseCard, isSelected && styles.selectedCourse]}
                accessibilityRole="button">
                <View style={[styles.courseIcon, { backgroundColor: course.color }]}>
                  <Text style={styles.courseEmoji}>{course.icon}</Text>
                </View>
                <View style={styles.courseDetails}>
                  <View style={styles.courseTitleRow}>
                    <Text style={styles.courseName} numberOfLines={1}>{course.name}</Text>
                    {isComplete && <Text style={styles.completeBadge}>Hoàn thành</Text>}
                  </View>
                  <Text style={styles.lessonCount}>{course.lessons} bài học</Text>
                  <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${course.progress}%`, backgroundColor: course.accent },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressValue, { color: course.accent }]}>
                      {course.progress}%
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
          {filteredCourses.length === 0 && (
            <Text style={styles.emptyState}>Không tìm thấy môn học phù hợp.</Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.label;
          return (
            <Pressable
              key={tab.label}
              onPress={() => setActiveTab(tab.label)}
              style={styles.navItem}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}>
              <Text style={[styles.navIcon, isActive && styles.activeNavIcon]}>{tab.icon}</Text>
              <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8F7',
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  greeting: {
    color: '#70807B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  studentName: {
    color: '#18352F',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 5,
  },
  subtitle: {
    color: '#778681',
    fontSize: 13,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell: {
    color: '#23443C',
    fontSize: 23,
    fontWeight: '600',
  },
  notificationDot: {
    position: 'absolute',
    right: 10,
    top: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E17A57',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#DCE9E5',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 11,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    minHeight: 115,
    padding: 13,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  statIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 17,
    fontWeight: '800',
  },
  statValue: {
    color: '#18352F',
    fontSize: 21,
    fontWeight: '800',
  },
  statLabel: {
    color: '#7A8984',
    fontSize: 10,
    marginTop: 3,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#18352F',
    fontSize: 19,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#87938F',
    fontSize: 12,
    marginTop: 4,
  },
  seeAll: {
    color: '#287C6A',
    fontSize: 12,
    fontWeight: '700',
  },
  searchBox: {
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchIcon: {
    color: '#778681',
    fontSize: 25,
    marginRight: 9,
    lineHeight: 29,
  },
  searchInput: {
    flex: 1,
    color: '#18352F',
    fontSize: 13,
    paddingVertical: 0,
  },
  clearSearch: {
    color: '#87938F',
    fontSize: 22,
    paddingLeft: 8,
  },
  courseList: {
    gap: 11,
  },
  courseCard: {
    minHeight: 102,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCourse: {
    borderColor: '#78B8A7',
  },
  courseIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  courseEmoji: {
    fontSize: 23,
  },
  courseDetails: {
    flex: 1,
    minWidth: 0,
  },
  courseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  courseName: {
    flex: 1,
    color: '#213B35',
    fontSize: 13,
    fontWeight: '700',
  },
  completeBadge: {
    color: '#278A72',
    backgroundColor: '#E4F3EF',
    overflow: 'hidden',
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 9,
    fontWeight: '700',
  },
  lessonCount: {
    color: '#87938F',
    fontSize: 11,
    marginTop: 5,
    marginBottom: 9,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    backgroundColor: '#EDF1EF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressValue: {
    width: 32,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '700',
  },
  emptyState: {
    color: '#778681',
    textAlign: 'center',
    paddingVertical: 28,
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E8EEEB',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 48,
  },
  navIcon: {
    color: '#9AA6A2',
    fontSize: 20,
    fontWeight: '700',
  },
  activeNavIcon: {
    color: '#287C6A',
  },
  navLabel: {
    color: '#9AA6A2',
    fontSize: 10,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#287C6A',
    fontWeight: '700',
  },
});

export default App;

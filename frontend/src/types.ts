export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  tags: string[];
  time: string;
  ageRange: string;
  location: string;
  distance?: string;
  groupSize: number;
  currentJoined: number;
  isHot?: boolean;
  isExpert?: boolean;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  image: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  certificates: string[];
}

export type GroupBuyStatus = 'ongoing' | 'completed' | 'failed';

export interface GroupBuy {
  id: string;
  courseId: string;
  courseTitle: string;
  courseImage: string;
  status: GroupBuyStatus;
  targetCount: number;
  currentCount: number;
  endTime: string; // ISO string
  leaderAvatar: string;
  participants: string[]; // Avatars
  price: number;
  originalPrice: number;
  failReason?: string;
  startTime?: string;
  coachName?: string;
}

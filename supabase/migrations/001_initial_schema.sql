-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  age INTEGER,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student progress
CREATE TABLE public.student_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  module_id INTEGER NOT NULL CHECK (module_id BETWEEN 1 AND 17),
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, module_id)
);

-- Quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  module_id INTEGER NOT NULL CHECK (module_id BETWEEN 1 AND 17),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  answers JSONB,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  condition_type TEXT NOT NULL CHECK (condition_type IN ('module_complete', 'milestone')),
  condition_value INTEGER NOT NULL
);

-- Student badges (earned)
CREATE TABLE public.student_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- Certificates
CREATE TABLE public.certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  certificate_number TEXT NOT NULL UNIQUE
);

-- ========== ROW LEVEL SECURITY ==========

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Student progress
CREATE POLICY "Students view own progress" ON public.student_progress FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students insert own progress" ON public.student_progress FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students update own progress" ON public.student_progress FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "Admins view all progress" ON public.student_progress FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Quiz attempts
CREATE POLICY "Students view own attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students insert own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins view all attempts" ON public.quiz_attempts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Badges (everyone can read)
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);

-- Student badges
CREATE POLICY "Students view own badges" ON public.student_badges FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students insert own badges" ON public.student_badges FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins view all badges" ON public.student_badges FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Certificates
CREATE POLICY "Students view own certificate" ON public.certificates FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students insert own certificate" ON public.certificates FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins view all certificates" ON public.certificates FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ========== TRIGGER: Auto-create profile on signup ==========
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, country, age)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'country',
    (NEW.raw_user_meta_data->>'age')::INTEGER
  );
  -- Initialize module 1 as unlocked
  INSERT INTO public.student_progress (student_id, module_id, status)
  VALUES (NEW.id, 1, 'in_progress');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========== SEED: Badges ==========
INSERT INTO public.badges (name, description, icon, color, condition_type, condition_value) VALUES
('First Bloom', 'Completed your very first SDG module!', '🌱', '#10B981', 'module_complete', 1),
('Equality Advocate', 'Completed the Gender Equality module', '⚖️', '#EC4899', 'module_complete', 5),
('Climate Hero', 'Completed the Climate Action module', '🌍', '#059669', 'module_complete', 13),
('SDG Champion', 'Completed 5 SDG modules', '⭐', '#F59E0B', 'milestone', 5),
('Future Leader', 'Completed 10 SDG modules', '🏆', '#7C3AED', 'milestone', 10),
('Change Maker', 'Completed 15 SDG modules', '🌟', '#EC4899', 'milestone', 15),
('Bloom Girl', 'Completed all 17 SDG modules — You are a true Bloom Girl!', '👑', '#F59E0B', 'milestone', 17);

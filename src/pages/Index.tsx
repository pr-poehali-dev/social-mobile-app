import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Tab = 'feed' | 'friends' | 'create' | 'notifications' | 'profile';

interface Story {
  id: number;
  user: string;
  avatar: string;
  gradient: string;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: 'Анна Петрова',
      avatar: 'https://cdn.poehali.dev/projects/8e760c6e-b3f4-4c94-adae-9a5031332b6c/files/261bbfab-7c59-4b22-9ecf-e2fa60119c7c.jpg',
      time: '2 часа назад',
      content: 'Обожаю это место! Атмосфера просто невероятная 🌟✨',
      image: 'https://cdn.poehali.dev/projects/8e760c6e-b3f4-4c94-adae-9a5031332b6c/files/17b2e477-fcd9-4ba7-a205-d6ea52492fcc.jpg',
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false
    },
    {
      id: 2,
      user: 'Максим Иванов',
      avatar: 'https://i.pravatar.cc/150?img=12',
      time: '5 часов назад',
      content: 'Новый проект запущен! Спасибо всей команде за поддержку 🚀',
      likes: 456,
      comments: 78,
      shares: 23,
      liked: true
    }
  ]);

  const stories: Story[] = [
    { id: 1, user: 'Твоя история', avatar: 'https://i.pravatar.cc/150?img=1', gradient: 'from-purple-500 to-pink-500' },
    { id: 2, user: 'Елена', avatar: 'https://i.pravatar.cc/150?img=5', gradient: 'from-orange-500 to-yellow-500' },
    { id: 3, user: 'Дмитрий', avatar: 'https://i.pravatar.cc/150?img=8', gradient: 'from-blue-500 to-purple-500' },
    { id: 4, user: 'Ольга', avatar: 'https://i.pravatar.cc/150?img=9', gradient: 'from-pink-500 to-red-500' },
    { id: 5, user: 'Игорь', avatar: 'https://i.pravatar.cc/150?img=11', gradient: 'from-green-500 to-blue-500' }
  ];

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const renderFeed = () => (
    <div className="pb-24">
      <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar">
        {stories.map((story, idx) => (
          <div key={story.id} className={`flex flex-col items-center gap-2 min-w-[70px] ${idx === 0 ? 'animate-fade-in' : ''}`}>
            <div className={`p-[3px] rounded-full bg-gradient-to-br ${story.gradient}`}>
              <div className="p-[2px] bg-white rounded-full">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={story.avatar} />
                  <AvatarFallback>{story.user[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <span className="text-xs text-center max-w-[70px] truncate">{story.user}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 px-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-0 shadow-lg animate-fade-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
              
              <p className="mb-3">{post.content}</p>
            </div>

            {post.image && (
              <div className="relative w-full aspect-square">
                <img src={post.image} alt="Post" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 transition-all ${post.liked ? 'text-red-500 animate-bounce-small' : 'hover:text-red-500'}`}
                  >
                    <Icon name="Heart" size={20} className={post.liked ? 'fill-current' : ''} />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <Icon name="MessageCircle" size={20} />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <Icon name="Share2" size={20} />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
                <button className="hover:text-purple-500 transition-colors">
                  <Icon name="Bookmark" size={20} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFriends = () => (
    <div className="px-4 py-6 pb-24">
      <div className="mb-6">
        <Input 
          placeholder="Поиск друзей..." 
          className="w-full bg-white/80 backdrop-blur-sm"
        />
      </div>
      
      <div className="space-y-3">
        {[
          { name: 'Екатерина Новикова', avatar: 'https://i.pravatar.cc/150?img=20', mutual: 12, status: 'В сети' },
          { name: 'Павел Соколов', avatar: 'https://i.pravatar.cc/150?img=14', mutual: 8, status: '5 мин назад' },
          { name: 'Виктория Лебедева', avatar: 'https://i.pravatar.cc/150?img=19', mutual: 15, status: 'В сети' }
        ].map((friend, idx) => (
          <Card key={idx} className="p-4 border-0 shadow-md animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  {friend.status === 'В сети' && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">{friend.mutual} общих друзей</p>
                  <p className="text-xs text-muted-foreground">{friend.status}</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                Написать
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="px-4 py-6 pb-24">
      <Card className="p-6 border-0 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Создать пост
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://cdn.poehali.dev/projects/8e760c6e-b3f4-4c94-adae-9a5031332b6c/files/261bbfab-7c59-4b22-9ecf-e2fa60119c7c.jpg" />
              <AvatarFallback>Я</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Твой профиль</p>
              <p className="text-xs text-muted-foreground">Публичный пост</p>
            </div>
          </div>

          <textarea 
            placeholder="Что у тебя нового?"
            className="w-full min-h-[120px] p-4 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Icon name="Image" size={20} className="mr-2" />
              Фото/Видео
            </Button>
            <Button variant="outline" className="w-full">
              <Icon name="Smile" size={20} className="mr-2" />
              Эмодзи
            </Button>
          </div>

          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white text-lg py-6">
            Опубликовать
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="px-4 py-6 pb-24">
      <div className="space-y-3">
        {[
          { type: 'like', user: 'Анна Петрова', action: 'оценила ваш пост', time: '5 мин назад', avatar: 'https://i.pravatar.cc/150?img=25' },
          { type: 'comment', user: 'Максим Иванов', action: 'прокомментировал', time: '1 час назад', avatar: 'https://i.pravatar.cc/150?img=33' },
          { type: 'follow', user: 'Елена Крылова', action: 'подписалась на вас', time: '3 часа назад', avatar: 'https://i.pravatar.cc/150?img=41' }
        ].map((notif, idx) => (
          <Card key={idx} className="p-4 border-0 shadow-md animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={notif.avatar} />
                <AvatarFallback>{notif.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notif.user}</span> {notif.action}
                </p>
                <p className="text-xs text-muted-foreground">{notif.time}</p>
              </div>
              {notif.type === 'like' && (
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-white" />
                </div>
              )}
              {notif.type === 'comment' && (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-white" />
                </div>
              )}
              {notif.type === 'follow' && (
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Icon name="UserPlus" size={20} className="text-white" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="pb-24">
      <div className="relative h-48 bg-gradient-to-br from-primary via-secondary to-accent">
        <img 
          src="https://cdn.poehali.dev/projects/8e760c6e-b3f4-4c94-adae-9a5031332b6c/files/6f6dc682-deaf-4ee8-86b3-92ffce04a8f5.jpg" 
          alt="Cover" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="px-4 -mt-16 relative">
        <div className="flex items-end justify-between mb-4">
          <div className="p-1 bg-white rounded-full">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://cdn.poehali.dev/projects/8e760c6e-b3f4-4c94-adae-9a5031332b6c/files/261bbfab-7c59-4b22-9ecf-e2fa60119c7c.jpg" />
              <AvatarFallback>АП</AvatarFallback>
            </Avatar>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary text-white mb-4">
            Редактировать
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Анна Петрова</h1>
          <p className="text-muted-foreground">@anna_petrova</p>
          <p className="mt-2">Люблю путешествия и фотографию 📸✨</p>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">234</p>
            <p className="text-sm text-muted-foreground">Постов</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">1.2K</p>
            <p className="text-sm text-muted-foreground">Друзей</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">3.4K</p>
            <p className="text-sm text-muted-foreground">Подписчиков</p>
          </div>
        </div>

        <Card className="p-4 border-0 shadow-md mb-4">
          <h3 className="font-semibold mb-3">Настройки</h3>
          <div className="space-y-3">
            {[
              { icon: 'Settings', text: 'Настройки аккаунта' },
              { icon: 'Lock', text: 'Приватность' },
              { icon: 'Bell', text: 'Уведомления' },
              { icon: 'HelpCircle', text: 'Помощь' }
            ].map((item, idx) => (
              <button key={idx} className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors">
                <Icon name={item.icon as any} size={20} />
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SocialHub
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setActiveTab('notifications')}>
              <Icon name="Bell" size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 border-0">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'friends' && renderFriends()}
        {activeTab === 'create' && renderCreate()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'profile' && renderProfile()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t z-50">
        <div className="flex items-center justify-around max-w-md mx-auto py-3 px-4">
          {[
            { icon: 'Home', label: 'Лента', tab: 'feed' as Tab },
            { icon: 'Users', label: 'Друзья', tab: 'friends' as Tab },
            { icon: 'PlusCircle', label: 'Создать', tab: 'create' as Tab },
            { icon: 'Bell', label: 'Уведомления', tab: 'notifications' as Tab },
            { icon: 'User', label: 'Профиль', tab: 'profile' as Tab }
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === item.tab 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon name={item.icon as any} size={24} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
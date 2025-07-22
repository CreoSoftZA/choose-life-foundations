import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Edit, Save, Plus, Eye, Trash2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DatabaseLesson {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  lesson_order: number;
  is_published: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, loading } = useAuth();
  const { isAdmin } = useProfile();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<DatabaseLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<DatabaseLesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    content: '',
    lesson_order: 1,
    is_published: true
  });


  useEffect(() => {
    if (user && isAdmin) {
      fetchLessons();
    }
  }, [user, isAdmin]);

  const fetchLessons = async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('lesson_order', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching lessons",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setLessons(data || []);
    }
  };

  const handleEdit = (lesson: DatabaseLesson) => {
    setSelectedLesson(lesson);
    setEditForm({
      title: lesson.title,
      description: lesson.description || '',
      content: lesson.content || '',
      lesson_order: lesson.lesson_order,
      is_published: lesson.is_published
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedLesson(null);
    setEditForm({
      title: '',
      description: '',
      content: '',
      lesson_order: lessons.length + 1,
      is_published: true
    });
    setIsEditing(true);
    setIsCreating(true);
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        const { error } = await supabase
          .from('lessons')
          .insert([editForm]);

        if (error) throw error;
        toast({ title: "Lesson created successfully" });
      } else if (selectedLesson) {
        const { error } = await supabase
          .from('lessons')
          .update(editForm)
          .eq('id', selectedLesson.id);

        if (error) throw error;
        toast({ title: "Lesson updated successfully" });
      }

      setIsEditing(false);
      setIsCreating(false);
      setSelectedLesson(null);
      fetchLessons();
    } catch (error: any) {
      toast({
        title: "Error saving lesson",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (lesson: DatabaseLesson) => {
    if (confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lesson.id);

      if (error) {
        toast({
          title: "Error deleting lesson",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({ title: "Lesson deleted successfully" });
        fetchLessons();
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setSelectedLesson(null);
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">Loading...</div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (!user) {
    return (
      <PageTransition>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p>Please sign in to access the admin panel.</p>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p>You don't have permission to access the admin panel.</p>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold mb-4">Admin Panel</h1>
              <p className="text-xl text-muted-foreground">Manage lessons and content</p>
            </div>

            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {isCreating ? 'Create New Lesson' : 'Edit Lesson'}
                  </h2>
                  <Button variant="outline" onClick={handleCancel}>
                    <ArrowLeft size={16} className="mr-2" />
                    Cancel
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Lesson Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="Lesson title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Brief description of the lesson"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lesson_order">Lesson Order</Label>
                        <Input
                          id="lesson_order"
                          type="number"
                          value={editForm.lesson_order}
                          onChange={(e) => setEditForm({ ...editForm, lesson_order: parseInt(e.target.value) || 1 })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_published"
                          checked={editForm.is_published}
                          onCheckedChange={(checked) => setEditForm({ ...editForm, is_published: checked })}
                        />
                        <Label htmlFor="is_published">Published</Label>
                      </div>
                    </div>

                    <div>
                      <Label>Content</Label>
                      <ReactQuill
                        value={editForm.content}
                        onChange={(value) => setEditForm(prev => ({ ...prev, content: value }))}
                        theme="snow"
                        style={{ height: '300px', marginBottom: '50px' }}
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link', 'image'],
                            ['clean']
                          ]
                        }}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save size={16} className="mr-2" />
                        Save Lesson
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Lessons</h2>
                  <Button onClick={handleCreate}>
                    <Plus size={16} className="mr-2" />
                    Create New Lesson
                  </Button>
                </div>

                <div className="grid gap-4">
                  {lessons.map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full">
                                #{lesson.lesson_order}
                              </span>
                              {lesson.is_published ? (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Published
                                </span>
                              ) : (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                  Draft
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mt-2">{lesson.title}</h3>
                            {lesson.description && (
                              <p className="text-muted-foreground mt-1">{lesson.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(lesson)}>
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete(lesson)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Admin;
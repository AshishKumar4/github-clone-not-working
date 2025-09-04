import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NewIssue, Issue } from 'shared/types';
const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  comment: z.string(),
});
interface NewIssueDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  owner: string;
  repoName: string;
  onSuccess: (newIssues: Issue[]) => void;
}
const createIssue = async ({ owner, repoName, issue }: { owner: string; repoName: string; issue: NewIssue }): Promise<Issue[]> => {
  const res = await fetch(`/api/repos/${owner}/${repoName}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issue),
  });
  if (!res.ok) {
    throw new Error('Failed to create issue');
  }
  const result = await res.json();
  return result.data;
};
export function NewIssueDialog({ isOpen, setIsOpen, owner, repoName, onSuccess }: NewIssueDialogProps) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      comment: '',
    },
  });
  const mutation = useMutation({
    mutationFn: createIssue,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['repoDetails', owner, repoName] });
      onSuccess(data);
      toast.success("New issue created successfully!");
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Failed to create issue. Please try again.");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ owner, repoName, issue: values });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>New issue</DialogTitle>
          <DialogDescription>
            Create a new issue for {owner}/{repoName}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave a comment (optional)"
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit new issue'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
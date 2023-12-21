import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Inputs = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters",
  }),

  desc: z.string().min(200, {
    message: "Description must be at least 200 characters",
  }),
  image: z.string(),
  category: z.string(),
  isPremium: z.boolean(),
});

const EditNewsForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const form = useForm({
    resolver: zodResolver(Inputs),
    defaultValues: {
      title: "",
      desc: "",
      image: "",
      category: "",
      isPremium: false,
    },
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:9000/news/${id}`);
          const fetchedData = response.data;
          form.reset(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", "drearymonday");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/minevf/image/upload",
        {
          method: "POST",
          body: fileData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        form.setValue("image", data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };

  const onSubmit = async (formData: z.infer<typeof Inputs>) => {
    try {
      const response = await axios.patch(`http://localhost:9000/news/${id}`, {
        ...formData,
        updated_at: new Date().toString(),
      });
      if (response.data) {
        toast.success("News updated successfully!");
        router.push("/admin/news");
      }
    } catch (error) {
      toast.error("" + error);
    }
  };

  return (
    <div className="w-full p-10 bg-white">
      <div className="my-10 flex-col text-center">
        <h1 className="font-heading text-xl md:text-3xl">Edit News</h1>
        <h3 className="leading-tight text-muted-foreground sm:text-xl sm:leading-8">
          Modify news details
        </h3>
      </div>

      <Form {...form}>
        <form
          className="grid gap-4 container text-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edit Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="News title"
                    value={form.getValues("title")}
                    onChange={(e) => form.setValue("title", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edit Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="News description"
                    value={form.getValues("desc")}
                    onChange={(e) => form.setValue("desc", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPremium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Edit Tag
                  <br />
                </FormLabel>
                <div className="flex flex-row gap-3">
                  <FormControl>
                    <Checkbox
                      checked={form.getValues("isPremium")}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Only premium subscriber can see full details about this news
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <img src={form.getValues("image")} className="h-64"></img>
                <FormLabel>Replace Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={form.getValues("category")}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={form.getValues("category")}
                      className="capitalize"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="world">World</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="my-5">
            Update News
            <span className="sr-only">Submit</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditNewsForm;

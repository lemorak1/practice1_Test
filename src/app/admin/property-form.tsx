"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '@/context/app-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { Property } from '@/lib/types';
import { uploadImage } from '@/lib/storage';

interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'House' | 'Apartment' | 'Condo' | 'Villa';
  amenities: string[];
  imageUrl: string;
  agent: {
    name: string;
    avatarUrl: string;
  };
}

type PropertyFormProps = {
  property?: Property;
};

export function PropertyForm({ property }: PropertyFormProps) {
  const { addProperty, updateProperty, amenitiesList } = useContext(AppContext)!;
  const router = useRouter();
  const { toast } = useToast();
  const isEditMode = !!property;
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<PropertyFormData>({
    defaultValues: isEditMode ? {
      ...property,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area
    } : {
      title: '',
      description: '',
      location: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      area: 1000,
      type: 'House',
      amenities: [],
      imageUrl: 'https://placehold.co/600x400.png',
      agent: {
          name: '',
          avatarUrl: 'https://placehold.co/100x100.png'
      }
    },
  });

  async function onSubmit(values: PropertyFormData) {
    const parsedValues = {
      ...values,
      price: Number(values.price),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      area: Number(values.area)
    };

    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        parsedValues.imageUrl = url;
        form.setValue('imageUrl', url);
      } catch (err) {
        toast({
          title: 'Upload failed',
          description: 'Image could not be uploaded. Check your bucket settings.'
        });
        return;
      }
    }
    if (isEditMode) {
      updateProperty({ ...parsedValues, id: property.id });
      toast({ title: 'Property Updated!', description: 'The property details have been saved.' });
    } else {
      try {
        await addProperty(parsedValues);
        toast({ title: 'Property Created!', description: 'The new property has been added to the listings.' });
      } catch (err) {
        toast({ title: 'Save failed', description: 'Unable to save property. Check Firebase permissions.' });
        return;
      }
    }
    router.push('/admin');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{isEditMode ? 'Edit Property' : 'Create New Property'}</CardTitle>
        <CardDescription>{isEditMode ? 'Update the details of the property.' : 'Fill in the details for the new property.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input placeholder="e.g. Modern Downtown Apartment" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl><Input placeholder="e.g. Metropolis, USA" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="A beautiful and modern apartment..." {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl><Input type="number" placeholder="350000" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Area (sqft)</FormLabel>
                        <FormControl><Input type="number" placeholder="1200" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="House">House</SelectItem>
                                <SelectItem value="Apartment">Apartment</SelectItem>
                                <SelectItem value="Condo">Condo</SelectItem>
                                <SelectItem value="Villa">Villa</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="bedrooms" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl><Input type="number" min="1" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="bathrooms" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl><Input type="number" min="1" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            
            <FormField control={form.control} name="amenities" render={() => (
                <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {amenitiesList.map((item) => (
                            <FormField key={item} control={form.control} name="amenities" render={({ field }) => (
                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...field.value, item])
                                                : field.onChange(field.value?.filter(value => value !== item))
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item}</FormLabel>
                                </FormItem>
                            )}
                            />
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )} />

            <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </FormControl>
                <FormDescription>The selected image will be uploaded to Firebase</FormDescription>
            </FormItem>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="agent.name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Agent Name</FormLabel>
                        <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="agent.avatarUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Agent Avatar URL</FormLabel>
                        <FormControl><Input placeholder="https://placehold.co/100x100.png" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>{isEditMode ? 'Save Changes' : 'Create Property'}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

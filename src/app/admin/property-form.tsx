"use client";
import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '@/context/app-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { storage, app } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import type { Property } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  bedrooms: z.coerce.number().int().min(1, "Must have at least 1 bedroom"),
  bathrooms: z.coerce.number().int().min(1, "Must have at least 1 bathroom"),
  area: z.coerce.number().min(100, "Area must be at least 100 sqft"),
  type: z.enum(['House', 'Apartment', 'Condo', 'Villa']),
  amenities: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one amenity.',
  }),
  imageUrl: z.string().optional(), // Make imageUrl optional initially,
  agentId: z.string().min(1, "Agent is required"), // Store agent ID instead of full object
});

type PropertyFormProps = {
  property?: Property;
};

export function PropertyForm({ property }: PropertyFormProps) {
  const { amenitiesList } = useApp(); // Removed addProperty and updateProperty as we'll use Firestore
  const router = useRouter();
  const { toast } = useToast();
  const db = getFirestore(app); // Get Firestore instance
  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]); // State for agents
  const [agentFilter, setAgentFilter] = useState(''); // State for agent filter input
  const isEditMode = !!property;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode ? {
      title: property?.title || '',
      description: property?.description || '',
      location: property?.location || '',
      price: property?.price ?? 0,
      bedrooms: property?.bedrooms ?? 1,
      bathrooms: property.bathrooms,
      area: property?.area ?? 1000,
      type: property?.type || 'House',
      amenities: property?.amenities || [],
      imageUrl: property?.imageUrl || '',
      agentId: property?.agent?.id || '',
    } : {
      title: 'Modern Downtown Apartment',
      description: '',
      location: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      area: 1000,
      type: 'House',
      amenities: ["Parking", "Gym"],
      imageUrl: '', // Default empty for new properties
      agentId: '', // Default empty
    },
    mode: 'onBlur', // Add mode for validation on blur
  });

  // Fetch agents on component mount
  useEffect(() => {
    const fetchAgents = async () => {
      const agentsCollection = collection(db, 'property_agents');
      const agentSnapshot = await getDocs(agentsCollection);
      const agentsList = agentSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setAgents(agentsList);
    };
    fetchAgents();
  }, [db]);

  // Filtered agents based on input
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(agentFilter.toLowerCase())
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const imageUrl = form.getValues('imageUrl') || property?.imageUrl || ''; // Use existing imageUrl if not uploading a new one

      // Construct the data object to save to Firestore
      const propertyData = {
        title: values.title,
        description: values.description,
        location: values.location,
        price: values.price,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        area: values.area,
        type: values.type,
        amenities: values.amenities,
        imageUrl: imageUrl,
        agentRef: doc(db, 'agents', values.agentId), // Store agent reference
      };
      if (isEditMode && property?.id) {
        // Update existing property in Firestore
        const propertyDoc = doc(db, 'properties', property.id);
        await updateDoc(propertyDoc, propertyData);
        toast({ title: 'Property Updated!', description: 'The property details have been saved to Firestore.' });
      } else {
        // Add a new document to the 'properties' collection
        await addDoc(collection(db, 'properties'), propertyData);
        toast({ title: 'Property Created!', description: 'The new property has been added to Firestore.' });
      }
    } catch (error: any) {
      toast({ title: 'Error saving property', description: error.message, variant: 'destructive' });
    }
    router.push('/admin');
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `property-images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      form.setValue('imageUrl', downloadURL);
      toast({ title: 'Image Uploaded!', description: 'The image has been uploaded successfully.' });
    }
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
                    <FormLabel>Property Image</FormLabel>
                    {isEditMode && property?.imageUrl && (
                      <div className="space-y-2">
                        <img src={property.imageUrl} alt="Current property image" className="w-32 h-32 object-cover rounded-md" />
                        <Input type="text" value={property.imageUrl} disabled className="text-sm text-muted-foreground" />
                      </div>
                    )}
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={handleImageUpload} />
                    </FormControl>
                    <FormDescription>
                      {isEditMode ? 'Upload a new image to replace the current one.' : 'Upload an image for the property.'}
                    </FormDescription>
 )

                </FormItem>

            )} />

            <FormField control={form.control} name="agentId" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Agent</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger onBlur={field.onBlur}>
                                    <SelectValue placeholder="Select an agent" />
                                </SelectTrigger>
                            </FormControl>
                            {/* Input for filtering agents */}
                            <Input
                                placeholder="Search agents..."
                                value={agentFilter}
                                onChange={(e) => setAgentFilter(e.target.value)}
                                className="px-2 py-1"
                                // Prevent the Select from closing when typing in the input
                                onKeyDown={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                            />

                            <SelectContent>
                                {agents.map((agent) => (
                                    <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

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
